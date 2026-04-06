import React from 'react';

const FormInput = ({ label, name, type, value, onChange, placeholder, error, required }) => {
  return (
    <div className="space-y-1.5">
      <label className="block text-xs font-light text-stone-500 tracking-wide">
        {label}
        {required && <span className="text-rose-300 ml-1">*</span>}
      </label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`w-full px-4 py-2.5 bg-white/40 backdrop-blur-sm rounded-xl text-sm text-stone-600 placeholder:text-stone-300 
          border transition-all duration-200 outline-none focus:bg-white/60
          ${error 
            ? 'border-rose-200 focus:border-rose-300' 
            : 'border-stone-200/50 focus:border-amber-200'
          }`}
      />
      {error && (
        <div className="text-rose-400 text-xs mt-1 font-light tracking-wide">
          {error}
        </div>
      )}
    </div>
  );
};

export default FormInput;