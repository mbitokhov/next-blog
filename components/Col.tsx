import * as React from 'react';
import { classnames } from '../utils/css';
import { BaseObject } from '../types';
import { exists, someExists } from '../utils/helpers';

interface ColumnProps {
  style?: React.CSSProperties;
  className?: string;

  size: number;
  small?: number;
  medium?: number;
  belowMedium?: number;
  mediumOnly?: number;
  large?: number;
}

export const Column: React.FunctionComponent<ColumnProps> = (props) => {
  const obj: BaseObject<boolean> = {};

  obj[`column-${props.size}`] = Boolean(props.size);
  obj[`column-${props.small}-small`] = Boolean(props.small);
  obj[`column-${props.medium}-medium`] = Boolean(props.medium);
  obj[`column-${props.mediumOnly}-medium-only`] = Boolean(props.mediumOnly);
  obj[`column-${props.belowMedium}-below-medium`] = Boolean(props.belowMedium);
  obj[`column-${props.large}-large`] = Boolean(props.large);

  return (
    <div className={classnames(props.className, obj)} style={props.style}>
      { props.children }
    </div>
  )
}

interface ColumnsProps {
  className?: string;
  style?: React.CSSProperties;

  all?: true;
  small?: true;
  medium?: true;
  large?: true;
  mediumOnly?: true;
  belowLarge?: true;

  wrap?: true;
}

export const Columns: React.FunctionComponent<ColumnsProps> = (props) => {
  const propsExists = {
    // if 'all' doesn't exists. assume 'all' if nothing else exists
    columns: exists(props, 'all') || !someExists(props, ['small', 'medium', 'large', 'mediumOnly', 'belowLarge']),

    'columns-small': exists(props, 'small'),
    'columns-medium': exists(props, 'medium'),
    'columns-large': exists(props, 'large'),
    'columns-medium-only': exists(props, 'mediumOnly'),
    'columns-below-large': exists(props, 'belowLarge'),

    wrap: exists(props, 'wrap'),
  }

  return <div className={classnames(props.className, propsExists)}>
    { props.children }
  </div>
}
