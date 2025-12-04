#  H&M Product Data Pipeline

A complete **ETL pipeline** that scrapes, cleans, and stores product data from **H&M.com** using **Apache Airflow** orchestration.

## Project Overview

This project implements an automated data pipeline that:
- **Scrapes** product listings from H&M (dynamic website with JavaScript rendering and infinite scroll)
- **Cleans** the data (removes duplicates, handles missing values, normalizes fields)
- **Loads** the cleaned data into a SQLite database
- **Orchestrates** the entire workflow using Apache Airflow (runs daily)

**Website:** [H&M](https://www2.hm.com)  
**Technology:** Selenium WebDriver for JavaScript-rendered content  
**Target Dataset:** 100+ products with structured fields (brand, description, price)

## Website Features

**Dynamic Catalog:** Product cards rendered via JavaScript  
**Multiple Categories:** Jeans, tops, dresses, skirts, trousers  
**Structured Fields:** Brand, description, raw price  
**Rich Metadata:** Suitable for analytics and visualization

## Why H&M?

 **Dynamic Content:** Uses JavaScript rendering for product listings  
 **Infinite Scroll:** Lazy loads more products as you scroll   **Structured Data:** Provides brand, description, and price fields  
 **High Volume:** Hundreds of products across multiple categories  
 **No Demo Conflicts:** Not used in course demonstrations

| Criteria                        | Met | Justification |
|--------------------------------|-----|---------------|
| JavaScript-rendered content    | +  | Product listings load dynamically |
| Infinite scroll / lazy loading | +  | Pages require scroll or button interaction |
| Structured product cards       | +  | Consistent fields: brand, title, price |
| High-volume data               | +  | 100+ products per category |
| Not used in course demos       | +  | Unique site selection |

## Project Structure

H&M/ 
├── README.md 
├── requirements.txt 
├── airflow_dag.py 
│ 
├── src/ 
│ ├── scraper.py # Selenium-based scraper 
│ ├── cleaner.py # Data cleaning logic 
│ └── loader.py # SQLite loader 
│ 
└── data/ 
│ ├── dirty_data.csv # Raw scraped data 
│ ├── cleaned_data.csv # Cleaned output 
│ └── hm_data.db # Final SQLite database


## Implementation Details

1. Web Scraping (`src/scraper.py`)
**Technology:** Selenium WebDriver with Chrome

**Features:**
- **Headless browser** support for automation
- **Dynamic content handling** (waits for product cards)
- **Infinite scroll** implementation to load 100+ products
- **Popup handling** (cookie consent)
- **Duplicate filtering** during scraping

**Extracted Data Fields:**
- `brand`: Default "H&M"
- `description`: Product name
- `price_raw`: Raw price string

2. Data Cleaning (src/cleaner.py)
****Technology:** Pandas

**Cleaning Operations:**
    **1. Remove Duplicates**
 Drops exact duplicates and duplicate product IDs.
    **2.Handle Missing Values**
 Fills missing brand with "H&M" and description with "No description".
    **3.Normalize Text Fields**
 Strips whitespace, standardizes case.
    **4.Convert Data Types**
 Converts price_raw → numeric price (float).
    **5.Validate Records**
 Removes rows with missing critical fields.

**Output:** cleaned_data.csv

3. Database Loading (src/loader.py)
**Technology:** SQLite3 (Python standard library)

**Database Schema:**

sql
CREATE TABLE hm_products (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    brand TEXT,
    description TEXT,
    price REAL,
    loaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
**Features:**
- **Replace strategy:** Table is replaced on each run
- **Transaction support** for data integrity
- **Timestamping** via loaded_at

4. Apache Airflow DAG
**DAG ID:** hm_scraping_pipeline 
**Schedule:** @daily (runs once every 24 hours)

**Tasks:**
**1.scrape_data** → Scrapes H&M using Selenium
**2.clean_data** → Cleans and validates the data
**3.load_to_sqlite** → Loads into SQLite database

## Verification Checklist
**Scraping**
[ ] Browser opens successfully

[ ] Page loads without errors

[ ] Cookie popup handled

[ ] Page scrolls to load more content

[ ] At least 100 products extracted

[ ] dirty_data.csv created

**Cleaning**
[ ] Duplicates removed
[ ] Missing values handled
[ ] Price converted to float
[ ] Text normalized
[ ] cleaned_data.csv created

**Loading**
[ ] SQLite database created
[ ] Table schema correct
[ ] Data inserted successfully
[ ] hm_data.db contains 100+ records

**Airflow DAG**
[ ] DAG appears in Airflow UI
[ ] Schedule set to @daily
[ ] Tasks: scrape → clean → load
[ ] DAG has successful run
[ ] Logs show complete execution

📝 Assignment Requirements Compliance
Requirement	Status	Details
Dynamic Website	✅	H&M uses JavaScript rendering, infinite scroll
Selenium/Playwright	✅	Implemented in scraper.py
Structured Data	✅	Product cards with brand, description, price
100+ Records	✅	Scrapes 110+ products
Remove Duplicates	✅	Implemented in cleaner.py
Handle Missing Values	✅	Default brand/description
Normalize Text	✅	Strip whitespace, standardize case
Type Conversions	✅	Price → float
SQLite Database	✅	hm_data.db with schema
Airflow DAG	✅	scrape → clean → load
24h Schedule	✅	@daily
Logging & Retries	✅	Configured in DAG
Successful Run	✅	Verified via Airflow UI

## References
**H&M:** https://www2.hm.com
**Selenium Documentation:** https://selenium-python.readthedocs.io/getting-started.html#simple-usage
**Apache Airflow:** https://airflow.apache.org/docs/
**Pandas:** https://pandas.pydata.org/docs/
**SQLite:** https://www.sqlite.org/docs.html