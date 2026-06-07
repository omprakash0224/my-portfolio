"use client";

import { Popover } from "@ark-ui/react/popover";
import { Portal } from "@ark-ui/react/portal";
import { Mail } from "lucide-react";

// LinkedIn icon
const LinkedinIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
  >
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

// GitHub icon
const GithubIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
  >
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.303 3.438 9.8 8.205 11.387.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.756-1.333-1.756-1.09-.745.083-.729.083-.729 1.205.084 1.84 1.237 1.84 1.237 1.07 1.834 2.807 1.304 3.492.997.108-.775.418-1.305.762-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.468-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.3 1.23a11.5 11.5 0 0 1 3.003-.404c1.02.005 2.047.138 3.006.404 2.29-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.61-2.807 5.625-5.479 5.921.43.372.823 1.102.823 2.222 0 1.606-.015 2.898-.015 3.293 0 .322.216.694.825.576C20.565 21.796 24 17.3 24 12c0-6.63-5.37-12-12-12z" />
  </svg>
);

interface ContactPopoverProps {
  triggerClassName?: string;
  triggerLabel?: string;
}

export function ContactPopover({
  triggerClassName,
  triggerLabel = "Contact",
}: ContactPopoverProps) {
  const contacts = [
    {
      icon: GithubIcon,
      label: "GitHub",
      href: "https://github.com/omprakash0224",
      display: "github.com/omprakash0224",
      color: "#e2e8f0",
    },
    {
      icon: LinkedinIcon,
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/iamomprakashsamal/",
      display: "iamomprakashsamal",
      color: "#60a5fa",
    },
    {
      icon: Mail,
      label: "Email",
      href: "mailto:omprakashsamal75@gmail.com",
      display: "omprakashsamal75@gmail.com",
      color: "#f472b6",
    },
  ];

  return (
    <Popover.Root>
      <Popover.Trigger
        className={
          triggerClassName ??
          "text-sm font-medium tracking-widest uppercase transition-opacity hover:opacity-70 duration-200"
        }
        style={triggerClassName ? undefined : { color: "#D7E2EA" }}
      >
        {triggerLabel}
      </Popover.Trigger>

      <Portal>
        <Popover.Positioner style={{ zIndex: 9999 }}>
          <Popover.Content
            style={{
              background: "rgba(15, 10, 20, 0.92)",
              border: "1px solid rgba(182, 0, 168, 0.35)",
              borderRadius: "16px",
              padding: "20px 22px",
              boxShadow:
                "0 8px 40px rgba(182, 0, 168, 0.2), 0 2px 8px rgba(0,0,0,0.6)",
              backdropFilter: "blur(18px)",
              minWidth: "260px",
            }}
          >
            <Popover.Arrow
              style={
                {
                  "--arrow-size": "10px",
                  "--arrow-background": "rgba(15,10,20,0.92)",
                } as React.CSSProperties
              }
            >
              <Popover.ArrowTip
                style={{
                  borderTop: "1px solid rgba(182,0,168,0.35)",
                  borderLeft: "1px solid rgba(182,0,168,0.35)",
                }}
              />
            </Popover.Arrow>

            {/* Title */}
            <Popover.Title
              style={{
                color: "#D7E2EA",
                fontSize: "0.7rem",
                fontWeight: 700,
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                marginBottom: "14px",
                opacity: 0.55,
              }}
            >
              Get in touch
            </Popover.Title>

            {/* Contact rows */}
            <Popover.Description>
              <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: "10px" }}>
                {contacts.map(({ icon: Icon, label, href, display, color }) => (
                  <li key={label}>
                    <a
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "12px",
                        textDecoration: "none",
                        padding: "8px 10px",
                        borderRadius: "10px",
                        transition: "background 0.18s",
                        background: "transparent",
                      }}
                      onMouseEnter={(e) =>
                        (e.currentTarget.style.background =
                          "rgba(182,0,168,0.10)")
                      }
                      onMouseLeave={(e) =>
                        (e.currentTarget.style.background = "transparent")
                      }
                    >
                      {/* Icon circle */}
                      <span
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          width: "34px",
                          height: "34px",
                          borderRadius: "50%",
                          background: "rgba(255,255,255,0.06)",
                          flexShrink: 0,
                          color,
                        }}
                      >
                        <Icon className="h-4 w-4" />
                      </span>

                      {/* Text */}
                      <span style={{ display: "flex", flexDirection: "column", gap: "1px" }}>
                        <span
                          style={{
                            color: "#D7E2EA",
                            fontSize: "0.78rem",
                            fontWeight: 600,
                            letterSpacing: "0.05em",
                          }}
                        >
                          {label}
                        </span>
                        <span
                          style={{
                            color: "rgba(215,226,234,0.5)",
                            fontSize: "0.7rem",
                          }}
                        >
                          {display}
                        </span>
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </Popover.Description>
          </Popover.Content>
        </Popover.Positioner>
      </Portal>
    </Popover.Root>
  );
}

// default export kept for backwards compat
export default ContactPopover;
