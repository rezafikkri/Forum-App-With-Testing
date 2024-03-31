import PropTypes from 'prop-types';

export default function Alert({ message, onClose, type = 'danger' }) {
  // generate message
  const replacedMessage = message.replace(/"/g, '');

  // capitalize first letter of the first word of the message
  const firstWord = replacedMessage.match(/[a-z]+/i)[0];
  const firstWordCapitalize = firstWord[0].toUpperCase() + firstWord.slice(1);

  const firstWordIndex = replacedMessage.indexOf(firstWord) + firstWord.length;
  const newMessage = firstWordCapitalize + replacedMessage.slice(firstWordIndex);

  // generate alert style based on type
  let alertClasses = 'text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400';
  if (type === 'info') {
    alertClasses = 'text-blue-800 rounded-lg bg-blue-50 dark:bg-gray-800 dark:text-blue-400';
  }

  return (
    <div className={`flex items-center p-4 mb-2 ${alertClasses}`} role="alert">
      <div>{newMessage}</div>
      <button type="button" className="ms-auto -mx-1.5 -my-1.5 bg-red-50 text-red-500 rounded-lg p-1.5 hover:bg-red-200 inline-flex items-center justify-center h-8 w-8 dark:bg-gray-800 dark:text-red-400 dark:hover:bg-gray-700" onClick={onClose}>
        <span className="sr-only">Close</span>
        <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
        </svg>
      </button>
    </div>
  );
}

Alert.propTypes = {
  message: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
  type: PropTypes.string,
};
