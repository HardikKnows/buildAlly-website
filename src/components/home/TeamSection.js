import Image from "next/image";
import { Section, SectionHeading } from "@/components/ui/Section";
import { RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { Icon } from "@/components/ui/Icon";
import { TEAM, initials } from "@/lib/team";

// Portrait, or a branded initials tile while no headshot exists. Both render at
// identical dimensions so swapping one in never moves anything.
//
// Deliberately NOT a stock photo: these are real people, and captioning someone
// else's face with their name would misrepresent them.
function Portrait({ member }) {
  const shared =
    "aspect-square w-20 overflow-hidden rounded-2xl ring-1 ring-line sm:w-22";

  if (member.image) {
    return (
      <Image
        src={member.image}
        alt={`${member.name}, ${member.role} at BuildAlly`}
        width={512}
        height={512}
        sizes="88px"
        loading="lazy"
        className={`${shared} object-cover`}
      />
    );
  }

  return (
    <div
      className={`${shared} flex items-center justify-center bg-gradient-brand`}
      aria-hidden="true"
    >
      <span className="font-display text-2xl font-bold tracking-tight text-white">
        {initials(member.name)}
      </span>
    </div>
  );
}

function TeamCard({ member }) {
  return (
    <RevealItem className="min-w-0">
      <article className="flex h-full flex-col rounded-2xl border border-line bg-white p-6 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-brand/30 hover:shadow-lg hover:shadow-brand/5">
        <Portrait member={member} />

        {member.department && (
          <p className="mt-5 text-xs font-semibold uppercase tracking-wider text-slate-body">
            {member.department}
          </p>
        )}

        <h3
          className={`font-display text-lg font-bold text-ink ${
            member.department ? "mt-1" : "mt-5"
          }`}
        >
          {member.name}
        </h3>
        <p className="mt-0.5 text-sm font-semibold text-brand">{member.role}</p>

        {member.bio && (
          <p className="mt-3 text-sm leading-relaxed text-slate-body">
            {member.bio}
          </p>
        )}

        {/* Only rendered once a URL or address exists in lib/team.js */}
        {(member.linkedin || member.email) && (
          <div className="mt-auto flex items-center gap-2 pt-5">
            {member.linkedin && (
              <a
                href={member.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${member.name} on LinkedIn`}
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-line text-ink-600 transition-colors hover:border-brand/40 hover:bg-brand-50 hover:text-brand"
              >
                <Icon name="Linkedin" size={16} />
              </a>
            )}
            {member.email && (
              <a
                href={`mailto:${member.email}`}
                aria-label={`Email ${member.name}`}
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-line text-ink-600 transition-colors hover:border-brand/40 hover:bg-brand-50 hover:text-brand"
              >
                <Icon name="Mail" size={16} />
              </a>
            )}
          </div>
        )}
      </article>
    </RevealItem>
  );
}

export function TeamSection() {
  return (
    <Section tone="white" id="team">
      <SectionHeading
        eyebrow="Our team"
        title="Meet the team"
        lead="The people building the future of construction management."
      />
      <RevealGroup className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {TEAM.map((member) => (
          <TeamCard key={member.name} member={member} />
        ))}
      </RevealGroup>
    </Section>
  );
}
