import { createCustomer } from './services/customerService';
import { createCompany } from './services/companyService';
import { createDeal } from './services/dealService';
import { createTask } from './services/taskService';

const customers = [
  { name: 'John Doe', email: 'john.doe@example.com', phone: '123-456-7890' },
  { name: 'Jane Smith', email: 'jane.smith@example.com', phone: '098-765-4321' },
];

const companies = [
  { name: 'Acme Corporation', industry: 'Technology', location: 'San Francisco' },
  { name: 'Globex Corporation', industry: 'Technology', location: 'Springfield' },
];

const deals = [
  { name: 'New Website', stage: 'Proposal', amount: 10000 },
  { name: 'Mobile App', stage: 'Negotiation', amount: 20000 },
];

const tasks = [
  { title: 'Follow up with John Doe', description: 'Discuss the new proposal', dueDate: '2025-10-01' },
  { title: 'Prepare for meeting with Globex', description: 'Finalize the presentation', dueDate: '2025-10-05' },
];

export const seedData = async () => {
  try {
    console.log('Seeding data...');
    for (const customer of customers) {
      console.log('Creating customer:', customer);
      await createCustomer(customer);
    }
    for (const company of companies) {
      console.log('Creating company:', company);
      await createCompany(company);
    }
    for (const deal of deals) {
      console.log('Creating deal:', deal);
      await createDeal(deal);
    }
    for (const task of tasks) {
      console.log('Creating task:', task);
      await createTask(task);
    }
    console.log('Data seeded successfully!');
  } catch (error) {
    console.error('Error seeding data:', error);
  }
};