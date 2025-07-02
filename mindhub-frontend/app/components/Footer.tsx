import { SiFacebook, SiInstagram, SiLinkedin, SiX } from 'react-icons/si';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

const Footer = () => {
  const footerLinks = [
    {
      title: "Company",
      links: [
        { label: "About Us", href: "/comingsoon" },
        { label: "Careers", href: "/comingsoon" },
        { label: "Press", href: "/comingsoon" },
        { label: "Blog", href: "/comingsoon" },
      ],
    },
    {
      title: "Resources",
      links: [
        { label: "Help Center", href: "/comingsoon" },
        { label: "Privacy Policy", href: "/comingsoon" },
        { label: "Terms of Service", href: "/comingsoon" },
        { label: "Cookie Policy", href: "/comingsoon" },
      ],
    },
    {
      title: "Connect",
      links: [
        { label: "Therapists", href: "/comingsoon" },
        { label: "Partnerships", href: "/comingsoon" },
        { label: "Community", href: "/comingsoon" },
        { label: "Contact Us", href: "#contact" },
      ],
    },
  ];

  const socialLinks = [
    { icon: <SiX size={18} />, href: "https://x.com/mindhubHS" },
    { icon: <SiFacebook size={18} />, href: "/comingsoon" },
    { icon: <SiInstagram size={18} />, href: "/comingsoon" },
    { icon: <SiLinkedin size={18} />, href: "https://www.linkedin.com/in/mindhub-hs-8551bb372" },
  ];

  return (
    <footer className="bg-foreground text-background py-16">
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🧠</span>
            <span className="text-xl font-bold">MindHub</span>
          </div>
          <p className="text-muted">
            Your mental wellness companion, helping you achieve balance and peace of mind through science-backed tools and community support.
          </p>
          <div className="flex gap-2">
            {socialLinks.map((social, index) => (
              <Button
                key={index}
                variant="ghost"
                size="icon"
                className="rounded-full bg-background/10 hover:bg-background/20 text-background"
                asChild
              >
                <Link href={social.href} aria-label={`${social} link`}>
                  {social.icon}
                </Link>
              </Button>
            ))}
          </div>
        </div>
        
        {footerLinks.map((section) => (
          <div key={section.title} className="space-y-4">
            <h4 className="text-lg font-semibold">{section.title}</h4>
            <ul className="space-y-2">
              {section.links.map((link) => (
                <li key={link.label}>
                  <Button
                    variant="link"
                    className="px-0 text-muted hover:text-background hover:no-underline"
                    asChild
                  >
                    <Link href={link.href}>{link.label}</Link>
                  </Button>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      
      <div className="max-w-6xl mx-auto px-6 pt-12 mt-8 border-t border-background/10 text-muted text-sm">
        <p>&copy; {new Date().getFullYear()} MindHub. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;