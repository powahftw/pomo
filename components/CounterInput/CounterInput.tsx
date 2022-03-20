import React from 'react';
import css from './CounterInput.module.css';

export default function CounterInput({
  label,
  suffix,
  value = 2,
  minValue = 1,
  maxValue = 60 * 60,
  onValChange,
}) {
  const PlusMinusButton = ({ text, action }) => {
    const roundedCorner = text === '-' ? 'rounded-l' : 'rounded-r';

    return (
      <button
        onClick={() => action()}
        className={`bg-gray-300 text-gray-600  hover:bg-gray-400  focus:bg-gray-400 h-full w-10 cursor-pointer outline-none ${roundedCorner}`}
      >
        <span className="text-2xl">{text}</span>
      </button>
    );
  };

  const clampValue = (n: number) => {
    if (isNaN(n)) {
      return minValue;
    }
    return Math.min(Math.max(n, minValue), maxValue);
  };

  return (
    <div
      className={`${css.numberPicker} h-6 w-26 flex flex-row items-center justify-between`}
    >
      <label
        htmlFor="inputVal"
        className="w-full text-gray-700 text-sm font-semibold"
      >
        {label}
        <sub> {suffix}</sub>
      </label>
      <div className="flex flex-row h-8 w-32 relative">
        <PlusMinusButton
          text={'-'}
          action={() => onValChange(clampValue(value - 1))}
        />
        <input
          type="number"
          className="outline-none focus:outline-none text-center w-full bg-gray-300 font-semibold text-gray-700"
          name="inputVal"
          onChange={(e) => onValChange(clampValue(parseInt(e.target.value)))}
          value={value}
          min={minValue}
          max={maxValue}
        />
        <PlusMinusButton
          text={'+'}
          action={() => onValChange(clampValue(value + 1))}
        />
      </div>
    </div>
  );
}
