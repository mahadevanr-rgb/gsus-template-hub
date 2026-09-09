const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, '../src');

function findFiles(dir, filter) {
  let results = [];
  if (!fs.existsSync(dir)) return results;
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat && stat.isDirectory()) {
      results = results.concat(findFiles(fullPath, filter));
    } else if (!filter || filter(fullPath)) {
      results.push(fullPath);
    }
  });
  return results;
}

const allCards = [
  'ProfileCard', 'TeamCard', 'ProductCard', 'PhotoProfileCard', 'StatCard',
  'KpiCard', 'MetricCard', 'ProgressCard', 'PricingCard', 'ComparisonCard',
  'SubscriptionCard', 'NotificationCard', 'AlertCard', 'StatusCard',
  'EventCard', 'BookingCard', 'AppointmentCard', 'TaskCard', 'KanbanCard',
  'ProjectCard', 'TestimonialCard', 'FeatureCard', 'RecommendationCard',
  'InvoiceCard', 'TransactionCard', 'PaymentCard', 'Card'
];

const allFiles = findFiles(srcDir, f => f.endsWith('.js') || f.endsWith('.jsx'));

allFiles.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  let original = content;

  // Clean corrupted card paths
  content = content.replace(/@\/pages\/Cards\/components\/[A-Za-z0-9_\/]+/g, (match) => {
    for (const card of allCards) {
      if (match.includes(card)) {
        return `@/pages/Cards/components/${card}/${card}`;
      }
    }
    return match;
  });

  // Ensure direct import format: '@/pages/Cards/components/XYZ/XYZ'
  allCards.forEach(card => {
    const reg = new RegExp(`['"]@/pages/Cards/components/${card}['"]`, 'g');
    content = content.replace(reg, `'@/pages/Cards/components/${card}/${card}'`);
  });

  if (content !== original) {
    fs.writeFileSync(file, content);
  }
});

console.log('✔ Normalized all Card component paths.');
