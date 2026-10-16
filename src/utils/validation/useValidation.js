import { useCallback, useMemo, useRef, useState } from "react";
import { validateField as runValidateField } from "./engine";

export function useValidation(initialValues = {}, schema = {}, options = {}) {
  const { mode = "first", validateOnChange = false, validateOnBlur = true, debounceMs = 300 } = options;
  const [values, setValuesState] = useState(initialValues);
  const [initial, setInitial] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [isValidating, setIsValidating] = useState(false);
  const valuesRef = useRef(initialValues);
  const sequenceRef = useRef({});
  const pendingRef = useRef({});

  const dirty = useMemo(() => Object.keys(values).some((key) => values[key] !== initial[key]), [values, initial]);
  const isValid = Object.keys(errors).length === 0;

  const validateField = useCallback(async (field, value = valuesRef.current[field]) => {
    const sequence = (sequenceRef.current[field] || 0) + 1;
    sequenceRef.current[field] = sequence;
    pendingRef.current[field] = sequence;
    setIsValidating(true);
    const result = await runValidateField(value, schema[field], {
      value,
      field,
      values: valuesRef.current,
      mode,
    }, { mode, debounceMs });
    if (sequenceRef.current[field] === sequence) {
      setErrors((current) => {
        if (!result.errors.length) {
          const next = { ...current };
          delete next[field];
          return next;
        }
        return { ...current, [field]: mode === "all" ? result.errors : result.error };
      });
    }
    if (pendingRef.current[field] === sequence) delete pendingRef.current[field];
    setIsValidating(Object.keys(pendingRef.current).length > 0);
    return result;
  }, [schema, mode, debounceMs]);

  const setValue = useCallback((field, value) => {
    const next = { ...valuesRef.current, [field]: value };
    valuesRef.current = next;
    setValuesState(next);
    if (validateOnChange) {
      void validateField(field, value);
      Object.entries(schema).forEach(([dependentField, fieldRules]) => {
        if (fieldRules?.dependsOn?.includes(field)) void validateField(dependentField, next[dependentField]);
      });
    }
  }, [validateOnChange, validateField, schema]);

  const setValues = useCallback((nextValues) => {
    const next = typeof nextValues === "function" ? nextValues(valuesRef.current) : nextValues;
    valuesRef.current = next;
    setValuesState(next);
    if (validateOnChange) Object.keys(schema).forEach((field) => void validateField(field, next[field]));
  }, [validateOnChange, schema, validateField]);

  const handleBlur = useCallback((field) => {
    setTouched((current) => ({ ...current, [field]: true }));
    if (validateOnBlur) void validateField(field);
  }, [validateOnBlur, validateField]);

  const validateForm = useCallback(async () => {
    const snapshot = valuesRef.current;
    const results = await Promise.all(Object.keys(schema).map(async (field) => [
      field,
      await validateField(field, snapshot[field]),
    ]));
    const nextErrors = {};
    results.forEach(([field, result]) => {
      if (result.errors.length) nextErrors[field] = mode === "all" ? result.errors : result.error;
    });
    const changedDuringValidation = valuesRef.current !== snapshot;
    if (!changedDuringValidation) setErrors(nextErrors);
    setTouched((current) => ({ ...current, ...Object.fromEntries(Object.keys(schema).map((field) => [field, true])) }));
    return { valid: !changedDuringValidation && Object.keys(nextErrors).length === 0, errors: nextErrors };
  }, [schema, mode, validateField]);

  const clearError = useCallback((field) => setErrors((current) => {
    const next = { ...current };
    delete next[field];
    return next;
  }), []);

  const resetValidation = useCallback((nextValues = initial) => {
    valuesRef.current = nextValues;
    setValuesState(nextValues);
    setInitial(nextValues);
    setErrors({});
    setTouched({});
    Object.keys(sequenceRef.current).forEach((field) => { sequenceRef.current[field] += 1; });
    pendingRef.current = {};
    setIsValidating(false);
  }, [initial]);

  const getFieldState = useCallback((field) => ({
    value: values[field],
    error: errors[field] || "",
    touched: Boolean(touched[field]),
    dirty: values[field] !== initial[field],
  }), [values, errors, touched, initial]);

  return {
    values,
    errors,
    touched,
    dirty,
    isValid,
    isValidating,
    setValue,
    setValues,
    handleBlur,
    validateField,
    validateForm,
    clearError,
    resetValidation,
    getFieldState,
  };
}

export default useValidation;
