import { program } from 'commander';

import Contacts from './contacts.js';

program
  .option('-a, --action <type>', 'choose action')
  .option('-i, --id <type>', 'user id')
  .option('-n, --name <type>', 'user name')
  .option('-e, --email <type>', 'user email')
  .option('-p, --phone <type>', 'user phone');

program.parse();

const options = program.opts();

async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case 'list':
      const contacts = await Contacts.listContacts();
      console.table(contacts);
      break;

    case 'get':
      const contact = await Contacts.getContactById(id);
      if (!contact) {
        console.log(`Contact with id=${id} not found`);
      }
      console.table(contact);
      break;

    case 'add':
      const newContact = await Contacts.addContact(name, email, phone);
      console.table(newContact);
      break;

    case 'remove':
      const removedContact = await Contacts.removeContact(id);
      if (!removedContact) {
        console.log(`Contact with id=${id} not found`);
      }
      console.table(removedContact);
      break;

    default:
      console.warn('\x1B[31m Unknown action type!');
  }
}

invokeAction(options);

// # Отримуємо і виводимо весь список контактів у вигляді таблиці (console.table)
// node index.js -a list

// # Отримуємо контакт по id і виводимо у консоль об'єкт контакту або null, якщо контакту з таким id не існує.
// node index.js -a get -i 05olLMgyVQdWRwgKfg5J6

// # Додаємо контакт та виводимо в консоль об'єкт новоствореного контакту
// node index.js -a add -n Mango -e mango@gmail.com -p 322-22-22

// # Видаляємо контакт та виводимо в консоль об'єкт видаленого контакту або null, якщо контакту з таким id не існує.
// node index.js -a remove -i qdggE76Jtbfd9eWJHrssH
