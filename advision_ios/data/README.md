# AdVision — Sample Training Dataset

A small, **teaching-sized** labeled dataset that shows how AdVision turns a social-media post
into a verdict. It is intentionally tiny (36 rows) and fully synthetic — every brand, handle,
and link is made up — so students can read every example by hand and *see why* a model would
make a given prediction.

> ⚠️ This is an educational toy dataset, not a production corpus. The real pipeline trains on
> millions of labeled examples. Use this to learn the workflow, not to ship a classifier.

## Files

| File | Format | Best for |
|------|--------|----------|
| `training_samples.csv` | CSV (one row per post) | Spreadsheets, pandas, first look |
| `training_samples.jsonl` | JSON Lines (one object per line) | NLP / deep-learning pipelines |

Both files contain the **same 36 examples**.

## The label (what we predict)

Each post belongs to exactly one of **6 content classes** — the same verdicts the app shows:

| `label` | Meaning |
|---------|---------|
| `genuine_recommendation` | A real, unpaid opinion |
| `undisclosed_ad` | A paid promotion **not** clearly labeled as an ad |
| `affiliate` | Creator earns commission via an affiliate link (disclosed or not) |
| `scam` | Fraud — fake giveaways, phishing, get-rich-quick |
| `fake_review` | Inauthentic / incentivized / bot-burst reviews |
| `dark_pattern` | Manipulative product/checkout page design |

The dataset is **balanced**: 6 examples per class.

## The features (what the model reads)

Besides the raw `text` and `link`, every row is hand-annotated with **9 binary deception
signals** (`1` = present, `0` = absent). These mirror the 9 signal families in the app and let
students train a model on clean features *before* learning how to extract them from raw text.

| Signal | `1` means… |
|--------|-----------|
| `affiliate_tag` | URL contains an affiliate/tracking tag (`?aff=`, `?ref=`, `?tag=`) |
| `promo_code` | A discount code is present (e.g. `MAYA15`) |
| `disclosure` | An ad/affiliate relationship is openly disclosed |
| `urgency` | Time pressure / scarcity ("only 3 left", "expires tonight") |
| `exaggerated_claim` | Unrealistic or absolute claims ("changed my life in 3 days") |
| `emoji_hype` | Heavy hype emoji use (😍🔥✨) |
| `seller_unverified` | Unknown/suspicious domain or seller |
| `review_anomaly` | Generic, duplicated, or burst-posted review text |
| `dark_pattern_ui` | Manipulative UI cue (fake timer, pre-checked box, confirmshaming) |

## How the labels relate to the signals (the teaching point)

Notice the patterns a model can learn:

- `genuine_recommendation` → almost all signals are `0`.
- `undisclosed_ad` → `promo_code`/`exaggerated_claim` **on**, but `disclosure` **off**.
- `affiliate` → `affiliate_tag` **on**, usually `disclosure` **on** too.
- `scam` → `urgency` + `seller_unverified` + `exaggerated_claim` cluster together.
- `fake_review` → `review_anomaly` is the giveaway.
- `dark_pattern` → `dark_pattern_ui` is **on**, tied to a checkout/product page.

The single most informative feature differs per class — that is exactly what **SHAP / feature
importance** reveals, and it is what the app surfaces as the plain-English 🚩 red flags.

## Quick start (Python)

```python
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import classification_report

df = pd.read_csv("training_samples.csv")

# 9 hand-annotated signals -> the verdict
features = ["affiliate_tag","promo_code","disclosure","urgency","exaggerated_claim",
            "emoji_hype","seller_unverified","review_anomaly","dark_pattern_ui"]
X, y = df[features], df["label"]

X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.3, stratify=y, random_state=42)

clf = RandomForestClassifier(n_estimators=200, random_state=42).fit(X_train, y_train)
print(classification_report(y_test, clf.predict(X_test)))

# Which signal matters most? (this is what becomes a "red flag")
for name, score in sorted(zip(features, clf.feature_importances_),
                          key=lambda x: -x[1]):
    print(f"{name:18s} {score:.3f}")
```

### Going further (from text, not hand labels)

In the real pipeline the 9 signals are *extracted*, not given. Students can try replacing the
hand-annotated columns with features derived from `text` + `link`:

```python
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.linear_model import LogisticRegression
from sklearn.pipeline import make_pipeline

model = make_pipeline(
    TfidfVectorizer(ngram_range=(1, 2), min_df=1),
    LogisticRegression(max_iter=1000))
model.fit(df["text"], df["label"])
```

Then compare: which works better on so few rows, and why? (Hint: with only 36 examples the
hand-annotated signals generalize far better than raw text — a great lesson in feature
engineering vs. data hunger.)

## Suggested student exercises

1. **Add your own row.** Find a real (anonymized) post, fill in the 9 signals, predict its label, then check the model agrees.
2. **Break the model.** Write a `scam` that looks like a `genuine_recommendation`. What feature would the app need to catch it?
3. **Confusion matrix.** Which two classes are easiest to mix up? (Try `undisclosed_ad` vs `affiliate`.)
4. **Calibration.** Use `predict_proba` — does an "87%" really mean 87%? Plot a reliability curve.
