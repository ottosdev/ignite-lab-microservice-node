export class Content {
  private readonly content: string;

  private validateContentLength(content: string): boolean {
    return content.length >= 5 && content.length <= 240;
  }

  constructor(content: string) {
    const isValidateLength = this.validateContentLength(content);

    if (!isValidateLength) {
      throw new Error('Content length error');
    }

    this.content = content;
  }

  get value(): string {
    return this.content;
  }
}
