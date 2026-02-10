// import React from "react";

// const ToggleSwitch = ({ checked, onChange }) => {
//   return (
//     <button
//       onClick={() => onChange(!checked)}
//       className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full transition-colors duration-300
//         ${checked ? "bg-green-600" : "bg-gray-300"}`}
//     >
//       <span
//         className={`inline-block h-5 w-5 transform rounded-full bg-white transition duration-300
//           ${checked ? "translate-x-5" : "translate-x-0"}`}
//       />
//     </button>
//   );
// };

// export default ToggleSwitch;

import React from "react";

const ToggleSwitch = ({ checked, onChange }) => {
  return (
    <button
      onClick={() => onChange(!checked)}
      className={`relative inline-flex h-6 w-11 cursor-pointer items-center rounded-full transition-colors duration-300
        ${checked ? "bg-[#0faf94]" : "bg-gray-300"}`}
    >
      <span
        className={`absolute left-1 h-4 w-4 rounded-full bg-white shadow-md transition-all duration-300
          ${checked ? "translate-x-5" : "translate-x-0"}`}
      />
    </button>
  );
};

export default ToggleSwitch;
