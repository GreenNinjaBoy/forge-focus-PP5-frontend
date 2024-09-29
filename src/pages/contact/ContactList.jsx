import { useState, useEffect } from 'react';
import axios from 'axios';
import { useCurrentUser } from '../../hooks/useCurrentUser';
import { useNavigate } from 'react-router-dom';
import styles from '../../styles/ContactList.module.css';

const ContactList = () => {
  const [contacts, setContacts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const currentUser = useCurrentUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (!currentUser || !currentUser.is_superuser) {
      navigate('/');
      return;
    }

    const fetchContacts = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get('/contact/list/');
        setContacts(response.data.results);
      } catch (error) {
        console.error('Error fetching contacts:', error);
        setError('Failed to fetch contacts. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchContacts();
  }, [currentUser, navigate]);

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  if (isLoading) return <div className={styles.loadingMessage}>Loading...</div>;
  if (error) return <div className={styles.errorMessage}>{error}</div>;

  return (
    <div className={styles.contactListContainer}>
      <h1>Contact Messages</h1>
      {contacts.length > 0 ? (
        <table className={styles.contactTable}>
          <thead>
            <tr>
              <th>Date</th>
              <th>Name</th>
              <th>Email</th>
              <th>Message</th>
            </tr>
          </thead>
          <tbody>
            {contacts.map((contact) => (
              <tr key={contact.id}>
                <td>{formatDate(contact.created_at)}</td>
                <td>{contact.name}</td>
                <td>{contact.email}</td>
                <td>{contact.message}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className={styles.noContacts}>No contact messages found.</p>
      )}
    </div>
  );
};

export default ContactList;