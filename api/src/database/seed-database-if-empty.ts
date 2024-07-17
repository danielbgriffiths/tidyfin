import { VercelPoolClient } from "@vercel/postgres";
import { v4 as uuidv4 } from "uuid";
import Stripe from "stripe";

export async function seedDatabaseIfEmpty(
  client: VercelPoolClient,
): Promise<VercelPoolClient> {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

  const features = [
    {
      name: "Basic Support",
      description: "Basic support needs.",
    },
    {
      name: "Pro Support",
      description: "Personalized support needs.",
    },
    {
      name: "Message Grouping",
      description: "Create message groups for budget breaking triggers.",
    },
    {
      name: "Unlimited Message Groups",
      description:
        "Create as many message groups for budget breaking triggers as you want.",
    },
    {
      name: "10x Budget Breaks",
      description: "10 budget breaks per month.",
    },
    {
      name: "100x Budget Breaks",
      description: "100 budget breaks per month.",
    },
    {
      name: "Unlimited Budget Breaks",
      description: "Unlimited budget breaks per month.",
    },
    {
      name: "Daily Encouragement Push Notifications",
      description:
        "Receive daily notifications and encouragement on your phone.",
    },
    {
      name: "Decision Analytics",
      description:
        "Data analytics in response to your progress over time. Helping you gain insight.",
    },
  ];

  const plans = [
    {
      name: "Basic",
      description:
        "You want to try out the app and see if it's a good fit for you.",
      price: 500,
      billing_cycle: "month",
      features: [features[0], features[2], features[3]],
    },
    {
      name: "Budgeteer",
      description:
        "You want incentives to save money, but don't require too much flexibility or the bells and whistles of decision analytics.",
      price: 1000,
      billing_cycle: "month",
      features: [
        features[0],
        features[2],
        features[3],
        features[5],
        features[7],
      ],
    },
    {
      name: "Budgeteer Pro",
      description:
        "You care about your financial future and you already have a track record of success.",
      price: 2000,
      billing_cycle: "month",
      features: [
        features[1],
        features[3],
        features[6],
        features[7],
        features[8],
      ],
    },
    {
      name: "Basic",
      description:
        "You want to try out the app and see if it's a good fit for you.",
      price: 500 * 11,
      billing_cycle: "year",
      features: [features[0], features[2], features[3]],
    },
    {
      name: "Budgeteer",
      description:
        "You want incentives to save money, but don't require too much flexibility or the bells and whistles of decision analytics.",
      price: 1000 * 11,
      billing_cycle: "year",
      features: [
        features[0],
        features[2],
        features[3],
        features[5],
        features[7],
      ],
    },
    {
      name: "Budgeteer Pro",
      description:
        "You care about your financial future and you already have a track record of success.",
      price: 2000 * 11,
      billing_cycle: "year",
      features: [
        features[1],
        features[3],
        features[6],
        features[7],
        features[8],
      ],
    },
  ];

  const existingStripeProducts = await stripe.products.list();
  const existingPlans = (await client.sql`SELECT name FROM plans`).rows;
  const existingFeatures = (await client.sql`SELECT name FROM features`).rows;

  const planResults = [];

  for (const plan of plans) {
    if (
      existingStripeProducts.data.some((product) => product.name === plan.name)
    ) {
      console.log(
        `Stripe product ${plan.name} already exists. Skipping creation.`,
      );
      continue;
    }

    if (
      existingPlans.some(
        (existingPlan) =>
          existingPlan.name === plan.name &&
          existingPlan.billing_cycle === plan.billing_cycle,
      )
    ) {
      console.log(
        `Plan ${plan.name} (${plan.billing_cycle}) already exists in database. Skipping insertion.`,
      );
      continue;
    }

    const product = await stripe.products.create({
      name: plan.name,
    });

    const { id: stripePriceId } = await stripe.prices.create({
      unit_amount: plan.price,
      currency: "usd",
      recurring: {
        interval: plan.billing_cycle as Stripe.Price.Recurring.Interval,
      },
      product: product.id,
    });

    const insertPlanResult = await client.sql`
      INSERT INTO plans (
        id,
        stripe_price_id,
        name,
        description,
        price,
        billing_cycle,
        created_at,
        updated_at
      )
      VALUES (
        ${uuidv4()},
        ${stripePriceId},
        ${plan.name},
        ${plan.description},
        ${plan.price / 100},
        ${plan.billing_cycle},
        ${new Date().toISOString()},
        ${new Date().toISOString()}
      )
      RETURNING id, name
    `;

    planResults.push(insertPlanResult.rows[0]);
  }

  const featureResults = [];

  for (const feature of features) {
    if (
      existingFeatures.some(
        (existingFeature) => existingFeature.name === feature.name,
      )
    ) {
      console.log(
        `Feature ${feature.name} already exists in database. Skipping insertion.`,
      );
      continue;
    }

    const insertFeatureResult = await client.sql`
      INSERT INTO features (
        id,
        name,
        description,
        created_at,
        updated_at
      )
      VALUES (
        ${uuidv4()},
        ${feature.name},
        ${feature.description},
        ${new Date().toISOString()},
        ${new Date().toISOString()}
      )
      RETURNING id, name
    `;

    featureResults.push(insertFeatureResult.rows[0]);
  }

  for (const planResult of planResults) {
    const plan = plans.find((p) => p.name === planResult.name);

    if (!plan) {
      console.log("Could not find plan for plan result:", planResult);
      continue;
    }

    for (const featureResult of featureResults) {
      if (!plan.features.some((f) => f.name === featureResult.name)) {
        continue;
      }

      await client.sql`
        INSERT INTO plan_features (
          id,
          plan_id,
          feature_id,
          created_at,
          updated_at
        )
        VALUES (
          ${uuidv4()},
          ${planResult.id},
          ${featureResult.id},
          ${new Date().toISOString()},
          ${new Date().toISOString()}
        )
      `;
    }
  }

  return client;
}
