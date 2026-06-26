import { IMPACT_STATS } from '../../constants';
import { StatItem } from '../ui';
import './ImpactStats.css';

function ImpactStats() {
  return (
    <section className="impact-stats" aria-label="Impact statistics">
      <div className="container">
        <div className="impact-stats__grid">
          {IMPACT_STATS.map((stat) => (
            <StatItem
              key={stat.label}
              icon={stat.icon}
              value={stat.value}
              label={stat.label}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default ImpactStats;
