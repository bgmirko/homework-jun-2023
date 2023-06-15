export const Button = ({ title = 'Submit', ...props }) => {
  return (
    <button
      className="inline-flex justify-center items-center py-4 px-6 text-base font-medium text-center text-white rounded-lg bg-blue-600 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-900"
      {...props}
    >
      {title}
    </button>
  );
};
