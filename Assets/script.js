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

  deleteContactAt(index) {
    if (this.head === null) return;

    if (index === 0) {
      this.head = this.head.next;
      this.displayContacts();
      return;
    }

    let current = this.head;
    let prev = null;
    let i = 0;

    while (current !== null && i < index) {
      prev = current;
      current = current.next;
      i++;
    }

    if (current !== null) {
      prev.next = current.next;
      this.displayContacts();
    }
  }

  displayContacts() {
    const contactList = document.getElementById("contactList");
    contactList.innerHTML = "";

    let current = this.head;
    let index = 0;

    while (current !== null) {
      const listItem = document.createElement("li");
      listItem.innerHTML = `
        <span>${current.name}: ${current.phone}</span>
        <button class="delete-btn" onclick="deleteContact(${index})">Delete</button>
      `;
      contactList.appendChild(listItem);

      current = current.next;
      index++;
    }
  }
}

const phonebook = new Phonebook();

document.getElementById("addContactForm").addEventListener("submit", (e) => {
  e.preventDefault();
  const name = document.getElementById("nameInput").value.trim();
  const phone = document.getElementById("phoneInput").value.trim();

  if (name && phone) {
    phonebook.addContact(name, phone);
    document.getElementById("addContactForm").reset();
  }
});

function searchContact() {
  const name = document.getElementById("searchInput").value.trim();

  if (name) {
    const contact = phonebook.searchContact(name);
    if (contact) {
      alert(`Contact found:\n${contact.name} - ${contact.phone}`);
    } else {
      alert("Contact not found.");
    }
  }
}

function deleteContact(index) {
  phonebook.deleteContactAt(index);
}
