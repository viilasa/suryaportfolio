<<<<<<< HEAD
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
=======
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
>>>>>>> 4f99cfc8c17cfa9d10bc14f1f3cde428fd5287d0
