import { SiDiscord, SiGithub } from "@icons-pack/react-simple-icons";
import { ArrowRight, Check, ExternalLink, Linkedin } from "lucide-react";
import { PageHeader } from "@/components/page-header";
import { Button } from "@/components/ui/button";

export default function CommunityPage() {
  return (
    <div className="flex h-full flex-col overflow-auto">
      <PageHeader />
      <div className="mx-auto w-full max-w-4xl px-4 py-6 md:px-6 md:py-8">
        {/* Page Title */}
        <div className="mb-8">
          <h1 className="font-bold text-2xl md:text-3xl">Community</h1>
          <p className="mt-1 text-muted-foreground">
            Learn, share, and build the future of AI security together.
          </p>
        </div>

        <div className="flex flex-col gap-8">
          {/* Discord CTA Section */}
          <div>
            <h3 className="mb-3 font-medium text-muted-foreground text-xs uppercase tracking-wider">
              Join the Conversation
            </h3>
            <div className="rounded-lg border bg-card p-6">
              <p className="mb-6 text-muted-foreground">
                Whether you&apos;re just curious about AI security or already
                deep in the field, our Discord is a place to ask questions,
                share ideas, and connect with others on the same journey.
              </p>
              <Button asChild className="w-full sm:w-auto" size="lg">
                <a
                  href="https://discord.gg/8VSKYDh6"
                  rel="noopener noreferrer"
                  target="_blank"
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
            <h3 className="mb-3 font-medium text-muted-foreground text-xs uppercase tracking-wider">
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
              <Button asChild className="w-full sm:w-auto" variant="outline">
                <a
                  href="https://silmaril.dev"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  Learn more at silmaril.dev
                  <ExternalLink className="ml-2 size-4" />
                </a>
              </Button>
            </div>
          </div>

          {/* Connect With Us Section */}
          <div>
            <h3 className="mb-3 font-medium text-muted-foreground text-xs uppercase tracking-wider">
              Connect With Us
            </h3>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <a
                className="flex flex-col items-center rounded-lg border bg-card p-6 transition-colors hover:bg-accent"
                href="https://www.linkedin.com/company/silmarilsecurity"
                rel="noopener noreferrer"
                target="_blank"
              >
                <Linkedin className="mb-3 size-8" />
                <span className="font-medium">LinkedIn</span>
                <span className="mt-1 text-muted-foreground text-sm">
                  Company news
                </span>
              </a>
              <a
                className="flex flex-col items-center rounded-lg border bg-card p-6 transition-colors hover:bg-accent"
                href="https://github.com/Silmaril-Security/GreenDragon"
                rel="noopener noreferrer"
                target="_blank"
              >
                <SiGithub className="mb-3 size-8" />
                <span className="font-medium">GitHub</span>
                <span className="mt-1 text-muted-foreground text-sm">
                  Star & contribute
                </span>
              </a>
            </div>
          </div>

          {/* Community Values Section */}
          <div>
            <h3 className="mb-3 font-medium text-muted-foreground text-xs uppercase tracking-wider">
              Community Values
            </h3>
            <div className="rounded-lg border bg-card p-6">
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <Check className="mt-0.5 size-5 text-emerald-500" />
                  <div>
                    <span className="font-medium">Be curious</span>
                    <p className="mt-0.5 text-muted-foreground text-sm">
                      Every question is welcome
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="mt-0.5 size-5 text-emerald-500" />
                  <div>
                    <span className="font-medium">Be respectful</span>
                    <p className="mt-0.5 text-muted-foreground text-sm">
                      Help others learn and grow
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="mt-0.5 size-5 text-emerald-500" />
                  <div>
                    <span className="font-medium">Be ethical</span>
                    <p className="mt-0.5 text-muted-foreground text-sm">
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
