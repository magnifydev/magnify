import '../App.css';
import { formSubmit } from '../config';
import { FC, useCallback, useState } from 'react';

export const ContactForm: FC = (): JSX.Element => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleFormSubmit = useCallback(
    (event: React.FormEvent<HTMLFormElement>) => {
      if (name === '' || email === '' || message === '') return;

      const submitButton = document.getElementById(
        'contact-submit'
      ) as HTMLButtonElement;
      const cancelButton = document.getElementById(
        'contact-cancel'
      ) as HTMLButtonElement;
      const contactName = document.getElementById(
        'contact-name'
      ) as HTMLButtonElement;
      const contactEmail = document.getElementById(
        'contact-email'
      ) as HTMLButtonElement;
      const contactMessage = document.getElementById(
        'contact-message'
      ) as HTMLButtonElement;
      submitButton.disabled = true;
      cancelButton.disabled = true;
      contactName.disabled = true;
      contactEmail.disabled = true;
      contactMessage.disabled = true;
      submitButton.textContent = 'Sending...';

      event.preventDefault();
      fetch(formSubmit.link, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: name,
          email: email,
          message: message,
        }),
      })
        .then((response) => response.json())
        .then((data: { message: string; success: string }) => {
          if (data.success !== 'true') throw new Error(data.message);
          const contactModal = document.getElementById(
            'contact-modal'
          ) as HTMLDialogElement;
          // In case Chrome Android does not support the close event
          submitButton.textContent = 'Sent!';
          contactModal?.parentElement?.classList.add('hide');
          contactModal.close();
          submitButton.textContent = 'Send';

          setName('');
          setEmail('');
          setMessage('');
          submitButton.disabled = false;
          cancelButton.disabled = false;
          contactName.disabled = false;
          contactEmail.disabled = false;
          contactMessage.disabled = false;

          setTimeout(() => {
            alert('The contact form was sent successfully!');
          }, 20);
        })
        .catch((error) => {
          submitButton.textContent = 'Send';
          submitButton.disabled = false;
          cancelButton.disabled = false;
          contactName.disabled = false;
          contactEmail.disabled = false;
          contactMessage.disabled = false;
          setTimeout(() => {
            alert('An error occurred while sending the form!');
          }, 20);
          throw error;
        });
    },
    [name, email, message]
  );

  const handleFormCancel = useCallback(() => {
    const contactModal = document.getElementById(
      'contact-modal'
    ) as HTMLDialogElement;
    // In case Chrome Android does not support the close event
    contactModal?.parentElement?.classList.add('hide');
    contactModal.close();
  }, []);

  const handleModalClose = useCallback((event: React.SyntheticEvent) => {
    event.currentTarget.parentElement?.classList.add('hide');
  }, []);

  return (
    <div className="Contact hide">
      <dialog id="contact-modal" className="modal" onClose={handleModalClose}>
        <h1>Contact</h1>
        <form className="modal-form" onSubmit={handleFormSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Name"
            className="modal-input"
            id="contact-name"
            onChange={useCallback(
              (event: React.ChangeEvent<HTMLInputElement>) => {
                setName(event.target.value);
              },
              []
            )}
            value={name}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="modal-input"
            id="contact-email"
            onChange={useCallback(
              (event: React.ChangeEvent<HTMLInputElement>) => {
                setEmail(event.target.value);
              },
              []
            )}
            value={email}
            required
          />
          <textarea
            name="message"
            placeholder="Message"
            className="modal-message"
            id="contact-message"
            onChange={useCallback(
              (event: React.ChangeEvent<HTMLTextAreaElement>) => {
                setMessage(event.target.value);
              },
              []
            )}
            value={message}
            required
          />
          <div className="flex-container modal-button-container">
            <button
              type="button"
              onClick={handleFormCancel}
              className="modal-cancel"
              id="contact-cancel"
            >
              Cancel
            </button>
            <button type="submit" className="modal-send" id="contact-submit">
              Send
            </button>
          </div>
        </form>
      </dialog>
    </div>
  );
};
