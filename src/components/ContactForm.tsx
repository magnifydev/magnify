import '../App.css';
import { formSubmit } from '../config';
import { FC, useCallback, useState } from 'react';

export const ContactForm: FC = (): JSX.Element => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const submitButton = document.getElementById(
    'contact-submit'
  ) as HTMLButtonElement;
  const cancelButton = document.getElementById(
    'contact-cancel'
  ) as HTMLButtonElement;
  const modalFieldDisable = document.getElementsByClassName(
    'modal-field-disable'
  ) as HTMLCollectionOf<HTMLInputElement | HTMLTextAreaElement>;
  const contactModal = document.getElementById(
    'contact-modal'
  ) as HTMLDialogElement;

  const disableFormInput = useCallback(() => {
    submitButton.disabled = true;
    cancelButton.disabled = true;
    Array.from(modalFieldDisable).forEach((element) => {
      element.disabled = true;
    });
  }, [cancelButton, modalFieldDisable, submitButton]);

  const enableFormInput = useCallback(() => {
    submitButton.disabled = false;
    cancelButton.disabled = false;
    Array.from(modalFieldDisable).forEach((element) => {
      element.disabled = false;
    });
  }, [cancelButton, modalFieldDisable, submitButton]);

  const handleFormSubmit = useCallback(
    (event: React.FormEvent<HTMLFormElement>) => {
      if (name === '' || email === '' || message === '') return;
      disableFormInput();
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
          // In case Chrome Android does not support the close event
          submitButton.textContent = 'Sent!';
          contactModal?.parentElement?.classList.add('hide');
          contactModal.close();
          submitButton.textContent = 'Send';

          setName('');
          setEmail('');
          setMessage('');
          enableFormInput();

          setTimeout(() => {
            alert('The contact form was sent successfully!');
          }, 20);
        })
        .catch((error) => {
          submitButton.textContent = 'Send';
          enableFormInput();

          setTimeout(() => {
            alert('An error occurred while sending the form!');
          }, 20);
          throw error;
        });
    },
    [
      name,
      email,
      message,
      disableFormInput,
      enableFormInput,
      submitButton,
      contactModal,
    ]
  );

  const handleFormCancel = useCallback(() => {
    // In case Chrome Android does not support the close event
    contactModal?.parentElement?.classList.add('hide');
    contactModal.close();
  }, [contactModal]);

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
            className="modal-input modal-field-disable"
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
            className="modal-input modal-field-disable"
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
            className="modal-message modal-field-disable"
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
