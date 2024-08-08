export default async function generateQuote(): Promise<
  {
    quote: string;
    author: string;
    category: string;
  }[]
> {
  try {
    const out = await fetch(
      "https://api.api-ninjas.com/v1/quotes?category=computers",
      {
        headers: {
          "X-Api-Key": process.env.API_NINJAS_KEY!,
        },
      }
    );
    if (out.status != 200) {
      throw Error();
    }
    return out.json();
  } catch {
    return [
      {
        quote:
          "It's not a bug - it's a feature. (This one definitely is an error, though).",
        author: "unknown",
        category: "computers",
      },
    ];
  }
}
