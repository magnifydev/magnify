import '../App.css';
import { FC, useCallback, useEffect, useState } from 'react';
import io from 'socket.io-client';

const socket = io('ws://129.146.123.55:3000');

export const ParsePDF: FC = (): JSX.Element => {
  const [parseInput, setParseInput] = useState('');
  const [parseProgress, setParseProgress] = useState('');

  useEffect(() => {
    // socket.connect();
    // socket.on("connect", () => { console.log('Connected!') });
    // socket.on('test', (data: string) => {
    //   console.log(data);
    // });
  });

  const submitButton = document.getElementById(
    'parse-submit'
  ) as HTMLButtonElement;
  const cancelButton = document.getElementById(
    'parse-cancel'
  ) as HTMLButtonElement;
  const modalFieldDisable = document.getElementsByClassName(
    'modal-field-disable'
  ) as HTMLCollectionOf<HTMLInputElement | HTMLTextAreaElement>;

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

  const handleModalClose = useCallback((event: React.SyntheticEvent) => {
    event.currentTarget.parentElement?.classList.add('hide');
  }, []);

  const handleFormCancel = useCallback(() => {
    // In case Chrome Android does not support the close event.
    // Also no idea why this could not be placed at the top earlier.
    // It appears the JS was executing before the element loaded,
    // ergo, the parseModal element was null. This did not happen
    // with the other components defined above. Unsure why...
    const parseModal = document.getElementById(
      'parse-modal'
    ) as HTMLDialogElement;
    parseModal?.parentElement?.classList.add('hide');
    parseModal.close();
  }, []);

  const handleFormSubmit = useCallback(
    (event: React.FormEvent<HTMLFormElement>) => {
      if (parseInput === '') return;

      disableFormInput();
      submitButton.textContent = 'Sending...';
      event.preventDefault();

      // Connect to socket.io server backend
      socket.connect();
      socket.on('connect', () => {
        console.log('Connected!');
      });
      socket.emit('text-submit', parseInput);
      console.log('sent event');
      socket.on('progress', ({ number, total }) => {
        console.log(number, total);
      });
      socket.on('complete', (json: JSON) => {
        console.log(json);
      });

      //   if (data.success !== 'true') throw new Error(data.message);
      //       submitButton.textContent = 'Sent!';

      //       handleFormCancel();

      //       submitButton.textContent = 'Send';

      //       setParseInput('');
      //       enableFormInput();

      //       setTimeout(() => {
      //         alert('The contact form was sent successfully!');
      //       }, 20);
      //     })
      //     .catch((error) => {
      //       submitButton.textContent = 'Send';
      //       enableFormInput();

      //       setTimeout(() => {
      //         alert('An error occurred while sending the form!');
      //       }, 20);

      //       throw error;
      //     });
    },
    [
      parseInput,
      disableFormInput,
      // enableFormInput,
      submitButton,
      // handleFormCancel,
    ]
  );

  return (
    <div className="ParsePDF hide">
      <dialog id="parse-modal" className="modal" onClose={handleModalClose}>
        <h1>Parse PDF</h1>
        <form className="modal-form" onSubmit={handleFormSubmit}>
          <textarea
            name="parse-textarea"
            placeholder="Copy and Paste the Linn-Mar High School Program of Studies..."
            className="modal-message modal-field-disable"
            id="parse-textarea"
            onChange={useCallback(
              (event: React.ChangeEvent<HTMLTextAreaElement>) => {
                setParseInput(event.target.value);
              },
              []
            )}
            value={parseInput}
            required
          />
          <div className="flex-container modal-button-container">
            <button
              type="button"
              onClick={handleFormCancel}
              className="modal-cancel"
              id="parse-cancel"
            >
              Cancel
            </button>
            <button type="submit" className="modal-send" id="parse-submit">
              Parse
              <progress className="parse-progress" value="70" max="100">
                70 %
              </progress>
            </button>
          </div>
        </form>
      </dialog>
    </div>
  );
};
