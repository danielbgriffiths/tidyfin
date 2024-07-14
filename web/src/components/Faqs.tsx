import { Container } from '@/components/Container'

const faqs = [
  [
    {
      question: 'Can I control who receives messages?',
      answer:
        'Yes, you define your message groups and your messages.',
    },
    {
      question: "How are you able to know what kind of transactions I'm making?",
      answer:
        'We have a stream of incoming transactions and with your definitions and a little bit of machine learning we can accurately categorize your transactions.',
    },
    {
      question: "Won't it be annoying for my message group friends and family?",
      answer: "It's in your hands to make financial decisions that align with your goals, and if you do your message groups will receive nothing and KNOW how successful you've been.",
    },
  ],
  [
    {
      question: "What if I don't want to share my financial information?",
      answer: "We only require READ access in order to read the invoice heading of each transaction. No additional financial information is stored.",
    },
    {
      question: 'Where is TidyFin based?',
      answer: "We're a distributed team, but our headquarters is in the cloud.",
    },
    {
      question: 'Is there any age limit on TidyFin?',
      answer: "Users will likely be 16+ but there are no restrictions."
    },
  ],
  [
    {
      question: 'Can I create different message groups and messages for different types of out of budget purchases?',
      answer: "Yes! You can have one message/message group that is alerted when you purchase Doordash outside of budget, and for instance, another that is alerted only for larger purchases.",
    },
    {
      question: 'Do you provide decision analytics over time?',
      answer:
        "Decision Analytics is an version 1.0 feature and will be released after the current beta.",
    },
    {
      question: 'Are there multiple subscription levels?',
      answer: "Cost with TidyFin is entirely in your control. If you abide by your budget you won't be using our resources, and thus, will not be charged beyond a minimum to support the application. But, there are subscription levels for additional insights and features."
    },
  ],
]

export function Faqs() {
  return (
    <section
      id="faqs"
      aria-labelledby="faqs-title"
      className="border-t border-gray-200 py-20 sm:py-32"
    >
      <Container>
        <div className="mx-auto max-w-2xl lg:mx-0">
          <h2
            id="faqs-title"
            className="text-3xl font-medium tracking-tight text-gray-900"
          >
            Frequently asked questions
          </h2>
          <p className="mt-2 text-lg text-gray-600">
            If you have anything else you want to ask,{' '}
            <a
              href="mailto:info@example.com"
              className="text-gray-900 underline"
            >
              reach out to us
            </a>
            .
          </p>
        </div>
        <ul
          role="list"
          className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-8 sm:mt-20 lg:max-w-none lg:grid-cols-3"
        >
          {faqs.map((column, columnIndex) => (
            <li key={columnIndex}>
              <ul role="list" className="space-y-10">
                {column.map((faq, faqIndex) => (
                  <li key={faqIndex}>
                    <h3 className="text-lg font-semibold leading-6 text-gray-900">
                      {faq.question}
                    </h3>
                    <p className="mt-4 text-sm text-gray-700">{faq.answer}</p>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  )
}
