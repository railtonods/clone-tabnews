import email from "infra/email.js";
import orchestrator from "tests/orchestrator.js";

beforeAll(async () => {
  await orchestrator.waitForAllServices();
});

describe("infra/email.js", () => {
  test("send()", async () => {
    await orchestrator.deleteAllEmails();

    await email.send({
      from: "Test <railtonoliiveira@gmail.com>",
      to: "railtonsilva17@hotmail.com",
      subject: "Teste de assunto",
      text: "Teste de corpo",
    });

    await email.send({
      from: "Test <railtonoliiveira@gmail.com>",
      to: "railtonsilva17@hotmail.com",
      subject: "Último email enviado",
      text: "Corpo do último email enviado",
    });

    const lastEmail = await orchestrator.getLastEmail();

    expect(lastEmail.sender).toBe("<railtonoliiveira@gmail.com>");
    expect(lastEmail.recipients[0]).toBe("<railtonsilva17@hotmail.com>");
    expect(lastEmail.subject).toBe("Último email enviado");
    expect(lastEmail.text).toBe("Corpo do último email enviado\r\n");
  });
});
