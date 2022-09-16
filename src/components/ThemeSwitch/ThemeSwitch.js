import React from 'react';
import { func, string } from 'prop-types';
import styled from 'styled-components';

const ToggleTheme = ({ theme, toggleTheme }) => {
  return (
    <ThemeSwitch>
      {theme === 'light' ? 'Dark mode' : 'Light mode'}
      <label className="theme-switch">
        {theme === 'light' ? (
          <input type="checkbox" onClick={toggleTheme} />
        ) : (
          <input type="checkbox" onClick={toggleTheme} defaultChecked />
        )}
        <div className="slider round"></div>
      </label>
    </ThemeSwitch>
  );
};
ToggleTheme.propTypes = {
  theme: string.isRequired,
  toggleTheme: func.isRequired,
};

const ThemeSwitch = styled.div`
  position: absolute;
  right: 2%;
  top: 2%;
  z-index: 1;
  // color: black!important;
  display: flex;
  flex-direction: column;
  align-items: center;
  .theme-switch {
    position: relative;
    display: inline-block;
    height: 25px;
    width: 50px;
    input {
      display: none;
      &:checked + .slider {
        background-color: ${({ theme }) => theme.bgColor};
      }
      &:checked + .slider:before {
        transform: translateX(23px);
      }
    }
    .slider {
      background-color: ${({ theme }) => theme.bgColor};
      position: absolute;
      cursor: pointer;
      bottom: 0;
      left: 0;
      right: 0;
      top: 0;
      transition: 0.2s;
      border: ${({ theme }) => theme.componentBorder};
      &:before {
        background-color: ${({ theme }) => theme.primaryColor};
        content: '';
        height: 18px;
        width: 18px;
        bottom: 3px;
        left: 4px;
        position: absolute;
        transition: 0.4s;
      }
      &.round {
        border-radius: 34px;
        &:before {
          border-radius: 50%;
        }
      }
    }
  }
`;

export default ToggleTheme;
