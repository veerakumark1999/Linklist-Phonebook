class Contact {
  constructor(name, phone) {
    this.name = name;
    this.phone = phone;
    this.next = null;
  }
}

class Phonebook {
  constructor() {
    this.head = null;
  }

  addContact(name, phone) {
    const newContact = new Contact(name, phone);

    if (this.head === null) {
      this.head = newContact;
    } else {
      let current = this.head;
      while (current.next !== null) {
        current = current.next;
      }
      current.next = newContact;
    }

    this.displayContacts();
  }

  searchContact(name) {
    let current = this.head;
    while (current !== null) {
      if (current.name.toLowerCase() === name.toLowerCase()) {
        return current;
      }
      current = current.next;
    }
    return null;
  }

  deleteContact(name) {
    if (this.head === null) {
      return;
    }

    if (this.head.name.toLowerCase() === name.toLowerCase()) {
      this.head = this.head.next;
      this.displayContacts();
      return;
    }

    let current = this.head;
    while (current.next !== null) {
      if (current.next.name.toLowerCase() === name.toLowerCase()) {
        current.next = current.next.next;
        this.displayContacts();
        return;
      }
      current = current.next;
    }
  }

  displayContacts() {
    const contactList = document.getElementById('contactList');
    contactList.innerHTML = '';

    let current = this.head;
    while (current !== null) {
      const listItem = document.createElement('li');
      listItem.textContent = `${current.name} - ${current.phone}`;
      contactList.appendChild(listItem);
      current = current.next;
    }
  }
}

const phonebook = new Phonebook();

document.getElementById('addContactForm').addEventListener('submit', (e) => {
  e.preventDefault();
  const name = document.getElementById('nameInput').value;
  const phone = document.getElementById('phoneInput').value;

  if (name && phone) {
    phonebook.addContact(name, phone);
    document.getElementById('nameInput').value = '';
    document.getElementById('phoneInput').value = '';
  }
});

function searchContact() {
  const name = document.getElementById('searchInput').value;

  if (name) {
    const contact = phonebook.searchContact(name);
    if (contact) {
      alert(`Contact found: ${contact.name} - ${contact.phone}`);
    } else {
      alert('Contact not found.');
    }
    document.getElementById('searchInput').value = '';
  }
}

function deleteContact() {
  const name = document.getElementById('deleteInput').value;

  if (name) {
    phonebook.deleteContact(name);
    document.getElementById('deleteInput').value = '';
  }
}
