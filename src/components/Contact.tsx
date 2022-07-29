import '../App.css';
import { formSubmit } from '../config';
import { FC, useCallback, useState } from 'react';

export const Contact: FC = (): JSX.Element => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = useCallback(
    (event: React.FormEvent<HTMLFormElement>) => {
      if (email === '' || message === '') return;
      event.preventDefault();
      fetch(formSubmit.link, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          name: name,
          email: email,
          message: message,
        }),
      })
        .then((response) => response.json())
        .then((data: { message: string; success: string }) => {
          if (data.success !== 'true') {
            alert('An error occurred while sending the form!');
            throw new Error(data.message);
          }
          const contactModal = document.getElementById(
            'contact-modal'
          ) as HTMLDialogElement;
          // In case Chrome Android does not support the close event
          contactModal?.parentElement?.classList.add('hide');
          contactModal.close();

          setEmail('');
          setMessage('');

          setTimeout(() => {
            alert('The contact form was sent successfully!');
          }, 20);
        });
    },
    [name, email, message]
  );

  const cancel = useCallback(() => {
    const contactModal = document.getElementById(
      'contact-modal'
    ) as HTMLDialogElement;
    // In case Chrome Android does not support the close event
    contactModal?.parentElement?.classList.add('hide');
    contactModal.close();
  }, []);

  const onModalClose = useCallback((event: React.SyntheticEvent) => {
    event.currentTarget.parentElement?.classList.add('hide');
  }, []);

  return (
    <div className="Contact hide">
      <dialog id="contact-modal" className="modal" onClose={onModalClose}>
        <h1>Contact</h1>
        <form className="modal-form" onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Name"
            className="modal-input"
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
            <button type="button" onClick={cancel} className="modal-cancel">
              Cancel
            </button>
            <button type="submit" className="modal-send">
              Send
            </button>
          </div>
        </form>
      </dialog>
    </div>
  );
};
