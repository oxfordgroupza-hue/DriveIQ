import Countdown from "@/components/Countdown";
import SignupForm from "@/components/SignupForm";
import { Button } from "@/components/ui/button";
import {
  ShieldCheck,
  Eye,
  Gauge,
  GraduationCap,
  Smartphone,
  Activity,
  Users,
} from "lucide-react";

const launchDate = new Date();
launchDate.setMonth(launchDate.getMonth() + 1); // launch in 1 month

function Feature({
  icon: Icon,
  title,
  desc,
}: {
  icon: any;
  title: string;
  desc: string;
}) {
  return (
    <div className="group rounded-xl border bg-card/60 p-6 shadow hover:shadow-lg transition-shadow">
      <div className="flex items-center gap-3">
        <div className="rounded-md bg-primary/10 p-2 text-primary">
          <Icon className="size-5" />
        </div>
        <h3 className="font-semibold">{title}</h3>
      </div>
      <p className="mt-2 text-sm text-muted-foreground">{desc}</p>
    </div>
  );
}

export default function Index() {
  const heroBg =
    "bg-[radial-gradient(40rem_20rem_at_10%_10%,hsl(var(--primary)/0.10),transparent),radial-gradient(50rem_25rem_at_90%_20%,hsl(var(--accent)/0.10),transparent)]";

  return (
    <div>
      {/* Hero */}
      <section className={`relative overflow-hidden ${heroBg}`}>
        <div className="container grid gap-10 py-20 md:py-28 lg:grid-cols-2 lg:items-center">
          <div className="text-center md:text-left">
            <div className="inline-flex items-center gap-2 rounded-full border bg-background/70 px-3 py-1 text-xs">
              <span className="inline-flex size-2 rounded-full bg-accent" />{" "}
              Early Bird now open — R139 once-off
            </div>
            <h1 className="mt-4 text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
              Master K53 and drive with confidence.
            </h1>
            <p className="mt-4 text-lg text-muted-foreground max-w-prose">
              DriveIQ combines interactive K53 theory, AI vision screening,
              realistic driving simulation, and instructor-grade analytics into
              one seamless learner ecosystem.
            </p>
            <div className="mt-6 flex flex-wrap items-center justify-center md:justify-start gap-3">
              <a href="#signup">
                <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
                  Join Early Bird Waiting List
                </Button>
              </a>
              <a href="#features">
                <Button variant="outline">Explore Features</Button>
              </a>
            </div>
            <div className="mt-8">
              <div className="text-xs text-muted-foreground mb-2">
                Launching in
              </div>
              <Countdown targetDate={launchDate} />
            </div>
            <div className="mt-6 grid grid-cols-2 gap-4 text-center text-xs text-muted-foreground sm:grid-cols-4">
              <div className="rounded-md border bg-background/50 p-3">
                University & TVET-ready
              </div>
              <div className="rounded-md border bg-background/50 p-3">
                NSFAS-aligned
              </div>
              <div className="rounded-md border bg-background/50 p-3">
                AI-driven
              </div>
              <div className="rounded-md border bg-background/50 p-3">
                Mobile-first
              </div>
            </div>
          </div>
          <div className="relative">
            <div className="aspect-[4/3] w-full overflow-hidden rounded-2xl border bg-gradient-to-br from-primary/15 via-background to-accent/15 shadow">
              <img
                src="/placeholder.svg"
                alt="DriveIQ preview"
                className="h-full w-full object-cover opacity-90"
              />
            </div>
            <div className="absolute -bottom-6 right-6 hidden sm:block rounded-xl border bg-background/80 p-4 shadow">
              <div className="text-xs text-muted-foreground">
                Focus & hazard response
              </div>
              <div className="mt-1 text-sm font-semibold">
                AI-monitored in real time
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="container py-16 md:py-24">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold sm:text-4xl">
            Everything learners need
          </h2>
          <p className="mt-3 text-muted-foreground">
            From theory to vision to simulation — synced into a single learner
            profile for instructors and institutions.
          </p>
        </div>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <Feature
            icon={GraduationCap}
            title="Learn K53 Theory"
            desc="Interactive lessons, quizzes, and practice tests with progress tracking."
          />
          <Feature
            icon={Gauge}
            title="DriveIQ Pilot (Simulator)"
            desc="Realistic driving scenarios: traffic rules, hazard perception, collision avoidance."
          />
          <Feature
            icon={Eye}
            title="DriveIQ Vision (AI Eye Test)"
            desc="AI-powered vision screening with prescription guidance and compliance logging."
          />
          <Feature
            icon={ShieldCheck}
            title="Verified Optometry"
            desc="Optometrist verification and spectacle delivery integrated via partners."
          />
          <Feature
            icon={Users}
            title="DriveIQ Connect"
            desc="Institution portal for University/TVETs, NSFAS and instructors with analytics and reports."
          />
          <Feature
            icon={Smartphone}
            title="DriveIQ Go (Mobile)"
            desc="Full mobile access: theory, tracking, notifications and reminders."
          />
        </div>
      </section>

      {/* Vision emphasis */}
      <section className="relative overflow-hidden border-y bg-gradient-to-br from-background via-secondary/50 to-background">
        <div className="container py-16 grid gap-8 lg:grid-cols-2 lg:items-center">
          <div className="order-2 lg:order-1 text-center lg:text-left">
            <h3 className="text-2xl font-bold">
              AI vision checks for safer training
            </h3>
            <p className="mt-3 text-muted-foreground">
              Learners are guided through AI screening before simulator or
              on-road sessions. Prescriptions are verified by optometrists, and
              improvements tracked once spectacles are provided.
            </p>
            <ul className="mt-5 text-sm text-muted-foreground list-disc pl-5 space-y-2">
              <li>Blocks practical training until vision is cleared</li>
              <li>Compliance is logged in learner profiles</li>
              <li>Supports Lensmart and partner supply chains</li>
            </ul>
          </div>
          <div className="order-1 lg:order-2">
            <div className="aspect-[16/10] w-full overflow-hidden rounded-2xl border bg-gradient-to-br from-accent/15 to-primary/15">
              <img
                src="/placeholder.svg"
                alt="AI Vision"
                className="h-full w-full object-cover opacity-90"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Early Bird Offer */}
      <section id="offer" className="container py-16 md:py-24">
        <div className="grid gap-8 lg:grid-cols-5 lg:items-center">
          <div className="lg:col-span-3 text-center lg:text-left">
            <h3 className="text-3xl font-bold">
              Early Bird Offer — R139 once-off
            </h3>
            <ul className="mt-4 text-muted-foreground space-y-2 text-sm">
              <li>Access to K53 theory and AI vision screening</li>
              <li>
                Learners cover exam and transport costs at local testing centres
              </li>
              <li>Simulator usage credits for pilot participants</li>
              <li>Optometrist follow-ups optional; compliance is logged</li>
              <li>Limited slots — urgency and exclusivity apply</li>
            </ul>
          </div>
          <div className="lg:col-span-2 mx-auto w-full max-w-md">
            <SignupForm />
          </div>
        </div>
      </section>

      {/* Academy */}
      <section
        id="academy"
        className="relative overflow-hidden border-y bg-gradient-to-br from-background via-secondary/50 to-background"
      >
        <div className="container py-16">
          <div className="grid gap-6 md:grid-cols-3">
            <div className="md:col-span-2 text-center md:text-left">
              <h3 className="text-3xl font-bold">DriveIQ Academy</h3>
              <p className="mt-3 text-muted-foreground">
                Life skills and job readiness beyond driving. Defensive
                strategies, safety awareness, soft skills, and employability —
                designed with University, TVET and NSFAS pathways in mind.
              </p>
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <div className="rounded-xl border bg-card/60 p-5">
                  <div className="text-sm font-semibold">Defensive Driving</div>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Hazard anticipation, collision avoidance and safe following
                    distances.
                  </p>
                </div>
                <div className="rounded-xl border bg-card/60 p-5">
                  <div className="text-sm font-semibold">Job Readiness</div>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Communication, teamwork, and workplace professionalism for
                    transport roles.
                  </p>
                </div>
              </div>
            </div>
            <div className="md:col-span-1">
              <div className="rounded-2xl border bg-gradient-to-br from-primary/10 to-accent/10 p-6">
                <div className="text-sm text-muted-foreground">Coming Soon</div>
                <div className="mt-2 text-lg font-semibold">
                  Simulator scenario previews
                </div>
                <ul className="mt-3 text-sm text-muted-foreground list-disc pl-5 space-y-1">
                  <li>Wet road hazard perception</li>
                  <li>Night-time visibility challenges</li>
                  <li>Urban traffic and pedestrians</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA bottom */}
      <section id="signup" className="container py-16 md:py-24">
        <div className="mx-auto max-w-2xl text-center">
          <h3 className="text-3xl font-bold">Be first to access DriveIQ</h3>
          <p className="mt-3 text-muted-foreground">
            Join the Early Bird list, secure your spot, and receive your unique
            referral link to share.
          </p>
        </div>
        <div className="mt-8 max-w-3xl mx-auto">
          <SignupForm />
        </div>
      </section>
    </div>
  );
}
