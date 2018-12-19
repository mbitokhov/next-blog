import * as React from 'react';
import { classnames } from '../utils/css';
import { BaseObject } from '../types';
import { exists } from '../utils/helpers';

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

  const className = classnames(props.className, obj);

  return (
    <div className={className} style={props.style}>
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
  belowMedium?: true;

  wrap?: true;
}

export const Columns: React.FunctionComponent<ColumnsProps> = (props) => (
  <div className={classnames(props.className, {
    columns: exists(props, 'all'),
    'columns-small': exists(props, 'small'),
    'columns-medium': exists(props, 'medium'),
    'columns-large': exists(props, 'large'),
    'columns-medium-only': exists(props, 'mediumOnly'),
    'columns-below-medium': exists(props, 'belowMedium'),

    wrap: exists(props, 'wrap'),
  })}>
    { props.children }
  </div>
)