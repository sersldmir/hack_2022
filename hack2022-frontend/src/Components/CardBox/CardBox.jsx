import React from 'react';
import cn from 'classnames';
import styles from './CardBox.module.scss';

export const CardBox = ({children, className, ...props}) => {
    return (
        <div className={cn(styles.container, {[className]: className})} {...props}>
            {children}
        </div>
    )
}