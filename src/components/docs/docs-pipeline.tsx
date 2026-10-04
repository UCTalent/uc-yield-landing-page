import { Braces, Fingerprint, ShieldCheck, Blocks, ArrowDown } from 'lucide-react';
import { useTranslations } from 'next-intl';

export function DocsPipeline() {
  const t = useTranslations('Docs');
  const steps = [
    { Icon: Braces, label: 'inputLabel', detail: 'inputDetail' },
    { Icon: Fingerprint, label: 'identityLabel', detail: 'identityDetail' },
    { Icon: ShieldCheck, label: 'evidenceLabel', detail: 'evidenceDetail' },
    { Icon: Blocks, label: 'anchorLabel', detail: 'anchorDetail' },
  ];
  return (
    <div className="docs-pipeline">
      <p className="docs-eyebrow">{t('example')}</p>
      <ol>
        {steps.map(({ Icon, label, detail }, index) => (
          <li key={label}>
            <span className="docs-pipeline-icon">
              <Icon size={19} aria-hidden="true" />
            </span>
            <div>
              <strong>{t(label)}</strong>
              <small>{t(detail)}</small>
            </div>
            <span className="docs-pipeline-number">0{index + 1}</span>
            {index < 3 && (
              <ArrowDown className="docs-pipeline-arrow" size={13} aria-hidden="true" />
            )}
          </li>
        ))}
      </ol>
      <p className="docs-pipeline-note">{t('exampleNote')}</p>
    </div>
  );
}
