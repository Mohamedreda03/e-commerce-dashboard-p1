import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Html,
  Link,
  Preview,
  Text,
} from "@react-email/components";

interface EmailVerificationTemplateProps {
  url: string;
}

export function EmailVerificationTemplate({
  url,
}: EmailVerificationTemplateProps) {
  return (
    <Html>
      <Head />
      <Preview>Verify your email address</Preview>
      <Body style={body}>
        <Container style={container}>
          <Heading style={heading}>Verify your email</Heading>
          <Text style={text}>
            Hi there! Please confirm this email belongs to you by clicking the
            button below.
          </Text>
          <Button href={url} style={button}>
            Verify Email
          </Button>
          <Text style={text}>
            If the button does not work, copy this link into your browser:
          </Text>
          <Link href={url} style={link}>
            {url}
          </Link>
        </Container>
      </Body>
    </Html>
  );
}

const body = {
  backgroundColor: "#ffffff",
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
};

const container = {
  margin: "0 auto",
  padding: "32px 20px",
  maxWidth: "480px",
};

const heading = {
  fontSize: "20px",
  fontWeight: 600,
};

const text = {
  fontSize: "14px",
  lineHeight: "20px",
};

const button = {
  backgroundColor: "#111827",
  color: "#ffffff",
  padding: "12px 16px",
  borderRadius: "4px",
  textDecoration: "none",
  display: "inline-block",
  margin: "16px 0",
};

const link = {
  fontSize: "12px",
  color: "#2563eb",
  wordBreak: "break-all" as const,
};
