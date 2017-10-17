import React from 'react';
import { BpkCalendarDate } from 'bpk-component-calendar';
import { cssModules } from 'bpk-react-utils';
import { isWeekend } from 'date-fns';

import STYLES from './custom-calendar-date.scss';

const getClassName = cssModules(STYLES);

class CustomCalendarDate extends BpkCalendarDate {
  render() {
    const {
      date,
      modifiers,
      onClick,
      onDateKeyDown,
      isFocused,
      isSelected,
      isBlocked,
      isOutside,
      isToday,
      isKeyboardFocusable,
      ...buttonProps
    } = this.props;
    const classNames = [getClassName('custom-calendar-date')];

    Object.keys(modifiers).forEach((modifier) => {
      if (modifiers[modifier](this.props)) { classNames.push(getClassName(`custom-calendar-date--modifier-${modifier}`)); }
    });

    const isCustomBlocked = isBlocked || isWeekend(date);

    if (isFocused) { classNames.push(getClassName('custom-calendar-date--focused')); }
    if (isSelected) { classNames.push(getClassName('custom-calendar-date--selected')); }
    if (isCustomBlocked) { classNames.push(getClassName('custom-calendar-date--blocked')); }
    if (isOutside) { classNames.push(getClassName('custom-calendar-date--outside')); }
    if (isToday) { classNames.push(getClassName('custom-calendar-date--today')); }

    delete buttonProps.preventKeyboardFocus;

    return (
      <button
        type="button"
        className={classNames.join(' ')}
        aria-label={date.getDate()}
        disabled={isCustomBlocked}
        tabIndex={(isKeyboardFocusable && isFocused) ? '0' : '-1'}
        onClick={() => { if (onClick) { onClick(date); } }}
        onKeyDown={onDateKeyDown}
        aria-pressed={isSelected}
        ref={this.getButtonRef}
        {...buttonProps}
      ><span aria-hidden="true">{ date.getDate() }</span></button>
    );
  }
}

export default CustomCalendarDate;
