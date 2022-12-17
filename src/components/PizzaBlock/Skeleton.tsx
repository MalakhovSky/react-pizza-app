import React from 'react';
import ContentLoader from 'react-content-loader';

export const Skeleton:React.FC = (props) => (
  <ContentLoader
    className="PizzaBlick"
    speed={2}
    width={280}
    height={466}
    viewBox="0 0 280 466"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}>
    <circle cx="69" cy="15" r="2" />
    <circle cx="137" cy="129" r="128" />
    <rect x="0" y="276" rx="15" ry="15" width="280" height="23" />
    <rect x="1" y="309" rx="15" ry="15" width="280" height="79" />
    <rect x="0" y="500" rx="14" ry="14" width="280" height="86" />
    <rect x="-1" y="404" rx="15" ry="15" width="104" height="20" />
    <rect x="133" y="404" rx="26" ry="26" width="145" height="32" />
  </ContentLoader>
);
