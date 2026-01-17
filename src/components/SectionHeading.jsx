const SectionHeading = ({ children, subtitle, dark = false }) => (
    <div className="section-heading">
        <h2 className={`section-heading__title ${dark ? 'section-heading__title--dark' : ''}`}>
            {children}
        </h2>
        {subtitle && (
            <p className={`section-heading__subtitle ${dark ? 'section-heading__subtitle--dark' : ''}`}>
                {subtitle}
            </p>
        )}
        <div className={`section-heading__line ${dark ? 'section-heading__line--dark' : ''}`}></div>
    </div>
);

export default SectionHeading;
