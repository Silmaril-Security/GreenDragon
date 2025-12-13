import { Check, ArrowRight, Linkedin, ExternalLink } from "lucide-react";
import { SiDiscord, SiGithub } from "@icons-pack/react-simple-icons";
import { PageHeader } from "@/components/page-header";
import { Button } from "@/components/ui/button";

export default function CommunityPage() {
  return (
    <div className="flex h-full flex-col overflow-auto">
      <PageHeader />
      <div className="mx-auto w-full max-w-4xl px-4 py-6 md:px-6 md:py-8">
        {/* Page Title */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold md:text-3xl">Community</h1>
          <p className="mt-1 text-muted-foreground">
            Learn, share, and build the future of AI security together.
          </p>
        </div>

        <div className="flex flex-col gap-8">
          {/* Discord CTA Section */}
          <div>
            <h3 className="mb-3 text-xs font-medium uppercase tracking-wider text-muted-foreground">
              Join the Conversation
            </h3>
            <div className="rounded-lg border bg-card p-6">
              <p className="mb-6 text-muted-foreground">
                Whether you&apos;re just curious about AI security or already deep in the
                field, our Discord is a place to ask questions, share ideas, and
                connect with others on the same journey.
              </p>
              <Button asChild size="lg" className="w-full sm:w-auto">
                <a
                  href="https://discord.gg/8VSKYDh6"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <SiDiscord className="mr-2 size-4" />
                  Join our Discord
                  <ArrowRight className="ml-2 size-4" />
                </a>
              </Button>
            </div>
          </div>

          {/* About Silmaril Section */}
          <div>
            <h3 className="mb-3 text-xs font-medium uppercase tracking-wider text-muted-foreground">
              About Silmaril
            </h3>
            <div className="rounded-lg border bg-card p-6">
              <p className="mb-4 text-muted-foreground">
                The AI attack surface has grown 40x in a year. Silmaril helps
                organizations stay ahead of threats with continuous, automated
                security testing.
              </p>
              <p className="mb-6 text-muted-foreground">
                Green Dragon is our open platform for AI security. Learn the
                fundamentals, test new techniques, or benchmark your red teaming
                skills in a safe, legal environment.
              </p>
              <Button asChild variant="outline" className="w-full sm:w-auto">
                <a
                  href="https://silmaril.dev"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Learn more at silmaril.dev
                  <ExternalLink className="ml-2 size-4" />
                </a>
              </Button>
            </div>
          </div>

          {/* Connect With Us Section */}
          <div>
            <h3 className="mb-3 text-xs font-medium uppercase tracking-wider text-muted-foreground">
              Connect With Us
            </h3>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <a
                href="https://www.linkedin.com/company/silmarilsecurity"
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center rounded-lg border bg-card p-6 transition-colors hover:bg-accent"
              >
                <Linkedin className="mb-3 size-8" />
                <span className="font-medium">LinkedIn</span>
                <span className="mt-1 text-sm text-muted-foreground">
                  Company news
                </span>
              </a>
              <a
                href="https://github.com/Silmaril-Security/GreenDragon"
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center rounded-lg border bg-card p-6 transition-colors hover:bg-accent"
              >
                <SiGithub className="mb-3 size-8" />
                <span className="font-medium">GitHub</span>
                <span className="mt-1 text-sm text-muted-foreground">
                  Star & contribute
                </span>
              </a>
            </div>
          </div>

          {/* Community Values Section */}
          <div>
            <h3 className="mb-3 text-xs font-medium uppercase tracking-wider text-muted-foreground">
              Community Values
            </h3>
            <div className="rounded-lg border bg-card p-6">
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <Check className="mt-0.5 size-5 text-emerald-500" />
                  <div>
                    <span className="font-medium">Be curious</span>
                    <p className="mt-0.5 text-sm text-muted-foreground">
                      Every question is welcome
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="mt-0.5 size-5 text-emerald-500" />
                  <div>
                    <span className="font-medium">Be respectful</span>
                    <p className="mt-0.5 text-sm text-muted-foreground">
                      Help others learn and grow
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="mt-0.5 size-5 text-emerald-500" />
                  <div>
                    <span className="font-medium">Be ethical</span>
                    <p className="mt-0.5 text-sm text-muted-foreground">
                      Practice responsible security
                    </p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
