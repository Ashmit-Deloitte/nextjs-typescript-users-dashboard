import styles from "./DetailsSection.module.css";

interface DetailItem {
  label: string;
  value: string;
  href?: string;
  external?: boolean;
}

interface DetailSectionProps {
  title: string;
  items: DetailItem[];
}

export default function DetailSection({ title, items }: DetailSectionProps) {
  return (
    <section className={styles.detailCard}>
      <h2>{title}</h2>

      {items.map((item) => (
        <div key={item.label} className={styles.detailItem}>
          <span>{item.label}</span>

          {item.href ? (
            <a
              href={item.href}
              target={item.external ? "_blank" : undefined}
              rel={item.external ? "noopener noreferrer" : undefined}
            >
              {item.value}
            </a>
          ) : (
            <p>{item.value}</p>
          )}
        </div>
      ))}
    </section>
  );
}
