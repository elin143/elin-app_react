import React from 'react';

const SelectDropdown = ({ label, name, options, value, onChange, error, required }) => {
  return (
    <div className="space-y-1.5">
      <label className="block text-xs font-light text-stone-500 tracking-wide">
        {label}
        {required && <span className="text-rose-300 ml-1">*</span>}
      </label>
      <div className="relative">
        <select
          name={name}
          value={value}
          onChange={(e) => onChange(name, e.target.value)}
          className={`w-full px-4 py-2.5 bg-white/40 backdrop-blur-sm rounded-xl text-sm text-stone-600 appearance-none cursor-pointer
            border transition-all duration-200 outline-none focus:bg-white/60
            ${error 
              ? 'border-rose-200 focus:border-rose-300' 
              : 'border-stone-200/50 focus:border-amber-200'
            }`}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value} className="text-stone-600">
              {option.label}
            </option>
          ))}
        </select>
        <div className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none text-stone-400 text-xs">
          ▼
        </div>
      </div>
      {error && (
        <div className="text-rose-400 text-xs mt-1 font-light tracking-wide">
          {error}
        </div>
      )}
    </div>
  );
};

export default SelectDropdown;