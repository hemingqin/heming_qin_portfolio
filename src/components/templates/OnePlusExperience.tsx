import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import type { CommercialProductExperience } from "@/types/portfolio";
import styles from "./OnePlusExperience.module.css";

export function OnePlusExperience({ experience }: { experience: CommercialProductExperience }) {
  return (
    <article className={styles.page}>
      <div className={styles.container}>
        <header className={styles.hero}>
          <h1>{experience.organization}</h1>
          <p className={styles.subtitle}>{experience.platformTagline}</p>
          <p className={styles.introduction}>{experience.roleSummary}</p>
          <dl className={styles.metadata}>
            <div><dt>Role</dt><dd>{experience.role}</dd></div>
            <div><dt>Employment dates</dt><dd>{experience.dates}</dd></div>
            <div><dt>Technology stack</dt><dd className={styles.tags}>{experience.technologies.map((technology) => <span key={technology}>{technology}</span>)}</dd></div>
          </dl>
          <p className={styles.notice}>{experience.proprietaryNotice}</p>
        </header>

        <section className={styles.background} aria-labelledby="oneplus-background">
          <h2 id="oneplus-background">Background</h2>
          <div className={styles.columns}>
            {experience.background.map((section) => (
              <div key={section.id}><h3>{section.title}</h3><p>{section.body}</p></div>
            ))}
          </div>
        </section>

        {experience.features.map((feature, index) => (
          <section key={feature.slug} className={styles.feature} aria-labelledby={`${feature.slug}-heading`}>
            <div className={styles.projectHeading}>
              <span className={styles.number}>0{index + 1}</span>
              <h2 id={`${feature.slug}-heading`}>{feature.name}</h2>
            </div>
            {feature.productIntro && (
              <div className={styles.productIntro}>
                <figure>
                  {feature.productIntro.image.src && <Image src={feature.productIntro.image.src} alt={feature.productIntro.image.alt} width={720} height={480} sizes="(max-width: 760px) 100vw, 560px" className={styles.image} />}
                </figure>
                <div>
                  <h3>{feature.productIntro.title}</h3>
                  <p>{feature.productIntro.description}</p>
                  {feature.productIntro.officialLink && <a className={styles.link} href={feature.productIntro.officialLink.href} target="_blank" rel="noopener noreferrer" aria-label={`${feature.productIntro.officialLink.label}: ${feature.productIntro.title} (opens in a new tab)`}>{feature.productIntro.officialLink.label}<ArrowUpRight size={17} aria-hidden="true" /></a>}
                </div>
              </div>
            )}
            <div className={styles.context}>
              <div><h3>Background</h3><p>{feature.background}</p></div>
              <div><h3>{feature.requirementLabel ?? "Requirement"}</h3><p>{feature.requirement}</p></div>
            </div>
            <section className={styles.contributions} aria-labelledby={`${feature.slug}-contributions`}>
              <h3 id={`${feature.slug}-contributions`}>My Engineering Contributions</h3>
              {feature.slug === "rcs-messaging" ? (
                <div className={styles.contributionItems}>
                  <div><h4>Contacts &amp; Phone integration</h4><p>I implemented Contacts and Phone application support for RCS status presentation, developing the UI and application logic for displaying RCS availability and RCS messaging indicators.</p></div>
                  <div><h4>Settings &amp; cross-functional validation</h4><p>I also added RCS-related settings and feature toggles within the Android Settings application, working closely with Product Managers, UI/UX designers, and QA engineers throughout development and validation.</p></div>
                </div>
              ) : <p>{feature.contribution}</p>}
            </section>
            <div className={styles.implementation}>
              <h3>Technical Implementation</h3>
              <p>{feature.technicalApproach}</p>
              {feature.workflow && <ol className={styles.workflow} aria-label="RCS implementation workflow">{feature.workflow.map((stage, stageIndex) => <li key={stage.id}><span>{String(stageIndex + 1).padStart(2, "0")}</span>{stage.label}</li>)}</ol>}
            </div>
            <div className={styles.outcome}><h3>Outcome &amp; Impact</h3><p>{feature.outcome}</p></div>
          </section>
        ))}

        {experience.responsibilities && <section className={styles.responsibilities} aria-labelledby="oneplus-responsibilities">
          <h2 id="oneplus-responsibilities">{experience.responsibilities.title}</h2>
          <div className={styles.columns}>{experience.responsibilities.items.map((item) => <div key={item.title}><h3>{item.title}</h3><p>{item.summary}</p></div>)}</div>
        </section>}
      </div>
    </article>
  );
}
