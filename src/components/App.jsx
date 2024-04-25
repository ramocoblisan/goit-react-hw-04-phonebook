import React, { useState, useEffect } from "react";
import Section from "./Section/Section";
import ContactForm from "./ContactForm/ContactForm";
import ContactList from "./ContactList/ContactList";
import FilterContacts from "./FilterContacts/FilterContacts";
import Notiflix from 'notiflix';

Notiflix.Notify.init({
  width: '280px',
  position: 'center-center',
  distance: '10px',
  opacity: 1,
});

export const App = () => {

  const [contacts, setContacts] = useState([
    {id: 'id-1', name: 'Rosie Simpson', number: '459-12-56'},
    {id: 'id-2', name: 'Hermione Kline', number: '443-89-12'},
    {id: 'id-3', name: 'Eden Clements', number: '645-17-79'},
    {id: 'id-4', name: 'Annie Copeland', number: '227-91-26'},
  ]);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    const storedContacts = localStorage.getItem('dataContacts');
    if (storedContacts) {
      setContacts(JSON.parse(storedContacts));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('dataContacts', JSON.stringify(contacts));
  }, [contacts]);

  const hendleAddContacts = (newContact) => {
    const existingContact = contacts.find(contact => contact.name === newContact.name);

    if (existingContact) {
      Notiflix.Notify.failure(`${newContact.name} is already in contacts!`);
    } else {
      setContacts(prevContacts => [...prevContacts, newContact]);
    }
  };
  
  const handleToggleContacts = (id) => {
    setContacts(prevContacts => prevContacts.map(contact => contact.id === id ? {...contact} : contact))
  };


  const handleAddFilter = (ev) => {
    setFilter(ev.target.value);
  };

  const handleFilteredContacts = () => {
    return contacts.filter(
      contact => contact.name.toLowerCase().includes(filter.toLowerCase())
    )
  };

  const handleDeletedContacts = (id) =>{
    setContacts(prevContacts => prevContacts.filter(contact => contact.id !== id))
  }

  return(
    <>
    <Section title="PhoneBook">
    <ContactForm onAddContacts = {hendleAddContacts} onToggleContacts={handleToggleContacts}/>
    <FilterContacts filter = {filter} onAddFilter = {handleAddFilter}/>
    <ContactList contacts ={handleFilteredContacts()}  onDeleteContacts ={handleDeletedContacts}/>
    </Section>
    </>
  )
}