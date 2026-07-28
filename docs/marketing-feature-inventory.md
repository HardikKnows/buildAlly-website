# BuildAlly — Marketing Feature Inventory

**The single source of truth for the BuildAlly marketing website.**

Every entry below was verified against the actual application code and, where a
screenshot is referenced, against the running product. Nothing here is aspirational
except the explicitly-labelled **Planned Features** section at the end.

| | |
|---|---|
| **Audit date** | 29 July 2026 |
| **Branch / commit** | `main` @ `c2cc9fa` |
| **Backend** | FastAPI + MongoDB (Motor), 42 feature modules, 291 REST endpoints |
| **Frontend** | React 19 + React Router 7, Tailwind + Radix UI, PWA (service worker) |
| **Screenshots** | `docs/marketing-assets/` — 66 images, captured from the live UI |

---

## How to keep this document current

1. **Feature added?** Add a row to the relevant category table, with a marketing
   description, a business benefit, a status and a screenshot reference.
2. **UI changed?** Re-run the capture harness (see *Screenshot Provenance* at the
   bottom) so the marketing site never ships a stale screen.
3. **Feature shipped from *Planned* → *Implemented*?** Move the row up out of
   *Planned Features*. Never leave a "Coming Soon" item mixed into a live section.

**Status vocabulary**

| Status | Meaning |
|---|---|
| **Implemented** | Complete and usable end-to-end by a customer today. |
| **Partial** | Works, but with a known gap noted in the row. Safe to demo, be careful how it's worded on the site. |
| **Internal** | Real and shipped, but a BuildAlly-staff tool — do not market to customers. |
| **Coming Soon** | Not built. Listed only in *Planned Features*. |

---

## Table of contents

- [1. Platform Foundation](#1-platform-foundation)
- [2. Authentication & Account Security](#2-authentication--account-security)
- [3. Company Management](#3-company-management)
- [4. Project & Site Management](#4-project--site-management)
- [5. Task Management](#5-task-management)
- [6. Milestones & Client Payment Schedule](#6-milestones--client-payment-schedule)
- [7. Attendance Management](#7-attendance-management)
- [8. Geofencing](#8-geofencing)
- [9. Geotagging & Verified Photos](#9-geotagging--verified-photos)
- [10. Salary & Payroll Management](#10-salary--payroll-management)
- [11. Company Treasury](#11-company-treasury)
- [12. Expense Management](#12-expense-management)
- [13. Site Finance & Budget](#13-site-finance--budget)
- [14. Document Management](#14-document-management)
- [15. Daily Reports & Progress](#15-daily-reports--progress)
- [16. Approvals](#16-approvals)
- [17. Reports & Exports](#17-reports--exports)
- [18. Notifications](#18-notifications)
- [19. Dashboards](#19-dashboards)
- [20. Client Portal (Key Holder)](#20-client-portal-key-holder)
- [21. Vendors, Materials & Subcontractors](#21-vendors-materials--subcontractors)
- [22. Billing & Subscription](#22-billing--subscription)
- [23. Super Admin Control Tower](#23-super-admin-control-tower)
- [24. Mobile Experience](#24-mobile-experience)
- [25. Support & Help](#25-support--help)
- [Key Selling Points](#key-selling-points)
- [Features Implemented but Not Marketed](#features-implemented-but-not-marketed)
- [Planned Features](#planned-features)
- [Appendix A — Screenshot Index](#appendix-a--screenshot-index)
- [Appendix B — Known Gaps Found During This Audit](#appendix-b--known-gaps-found-during-this-audit)
- [Appendix C — Screenshot Provenance](#appendix-c--screenshot-provenance)

---

## 1. Platform Foundation

### Multi-Tenant SaaS Architecture
**Marketing description.** Every construction company gets its own private, isolated
workspace. Your projects, your team, your money — never visible to anyone else.

**Business benefit.** One platform, zero data leakage. A contractor can invite
clients and subcontractors into their workspace without exposing them to anything
they aren't entitled to see.

**How it works (verified).** Every record carries a `company_id`, and every query
is scoped to it. Beyond that, `SITE_ACCESS_ENFORCEMENT` narrows site-scoped roles
to only their `assigned_sites` at the server. Members are additionally given a
human-readable Company Code and Member Code.

**Status.** Implemented · **Screenshot.** `settings.png`

### Role-Based Access Control — 9 roles, 60+ permissions
**Marketing description.** Nine purpose-built roles, from Director down to Key
Holder, each seeing exactly the part of the business they're responsible for.

**Business benefit.** A site engineer never sees the company's bank balance. A
project manager runs the site's costs but never sees client revenue. A client sees
their own project and nothing else. This is enforced by the server, not just hidden
in the UI.

**The nine roles.**

| Role | Label shown to users | Sees |
|---|---|---|
| `bod` | **Director** | Everything. The only role with Company Treasury access. |
| `admin` | **Admin** | Users, companies, projects, system ops, configuration. No financial approve/delete. |
| `project_manager` | **Project Manager** | Assigned sites: tasks, costs, expenses, documents, progress. **Never** client payment amounts, revenue or Treasury. |
| `accountant` | **Accountant** | Salary, payroll, payslips, reports, monthly attendance. Read-only member directory. Cannot approve. |
| `site_engineer` | **Site Engineer** | Assigned sites: tasks, photos, attendance, documents, expense + salary requests. |
| `sub_contractor` | **Sub-Contractor** | Only their own assignments and their own payment ledger. |
| `vendor` | **Vendor** | Material requests, their documents and payments. |
| `key_holder` | **Key Holder** (the client) | Their own project: progress, milestones, photos, payments. View-only. |
| `super_admin` | **Super Admin** | BuildAlly platform staff. Never creatable from inside a tenant. |

> `engineer` and `site_supervisor` are legacy identifiers that normalise to
> `site_engineer` on read. They are never offered when creating a member.

**Status.** Implemented · **Screenshot.** `member-management.png`

### Progressive Web App
**Marketing description.** Install BuildAlly on any phone straight from the browser
— no app store, no download, always the latest version.

**Business benefit.** Site staff get an app-like experience on whatever device they
already own, and it keeps working when signal drops on site.

**Verified capability.** `manifest.json` with `display: standalone`, app icons and
five home-screen shortcuts (Dashboard, Sites, Notifications, Add Expense,
Approvals); a service worker; an install prompt; an offline screen; a client-side
offline action queue that replays queued work when connectivity returns; and an
app-update banner when a new build ships.

**Status.** Implemented · **Screenshot.** `mobile-dashboard.png`

---

## 2. Authentication & Account Security

| Feature | Marketing description | Business benefit | Status | Screenshot |
|---|---|---|---|---|
| **Email + password login** | Sign in with your work email. | Familiar, no training needed. | Implemented | `login-screen.png` |
| **JWT authentication with refresh tokens** | Bank-style session tokens that expire and renew silently. | Sessions can be revoked; a stolen token has a short life. | Implemented | — |
| **"Remember this device"** | Stay signed in on your own phone for 60 days instead of 14. | Field staff aren't re-authenticating every week. | Implemented | `login-screen.png` |
| **Company self-registration** | Create your company workspace in one form. | Zero-touch onboarding; no sales call required to get started. | Implemented | `register-company.png` |
| **Email verification** | Confirm the address before the workspace goes live. | Blocks typo'd and throwaway signups. | Implemented | — |
| **Password reset & create-password links** | Signed, expiring links by email. | Standard, safe self-service recovery. | Implemented | — |
| **Member invitations** | Invite your team by email; they set their own password on activation. | Onboard a whole site team in minutes. | Implemented | `member-management.png` |
| **Magic login links** | Admin-issued passwordless sign-in link (30-minute validity). | Get a site worker in without a password reset call. | Implemented | — |
| **OTP login** | Request and verify a one-time code. | An alternative for users who struggle with passwords. | Implemented | — |
| **Google SSO** | Sign in — or onboard a whole company — with Google. | One-click access, no new password. | Implemented (config-gated) | `login-screen.png` |
| **Login access control** | Grant or revoke a member's ability to log in without deleting them. | Suspend an employee instantly; keep their history. | Implemented | `member-management.png` |
| **Rate limiting** | Per-IP throttling on authentication endpoints. | Blunts credential-stuffing and brute force. | Implemented (production mode) | — |
| **Audit trail** | Append-only log of who did what. | Dispute resolution and accountability. | Implemented | `super-admin-audit.png` |

---

## 3. Company Management

### Company Workspace & Settings
**Marketing description.** One place to configure your business identity, branding,
finance rules, working week and security policy.

**Business benefit.** Your documents, payslips and reports come out looking like
*your* company, not like generic software.

**Configurable, verified against the schema.**

- **Business information** — company name, address, phone, email, website, GSTIN
- **Branding** — logo upload (with dimension + size validation), footer text,
  workspace accent colour
- **Finance** — approval threshold (the rupee value above which approval escalates
  to Director)
- **Localization** — currency (default INR) and timezone (default Asia/Kolkata)
- **Attendance policy** — require a selfie at check-in; auto-checkout enabled and
  at what time; working week (`monday_saturday` or a custom weekday set), which
  drives the salary/attendance working-day estimate
- **Governance** — allow Project Managers to delete documents on their sites (off
  by default)
- **Contacts** — Primary Contact (POC) and billing contact, Director-only

**Status.** Implemented · **Screenshot.** `settings.png`

### Member Management
**Marketing description.** Add your whole team, assign them to sites, set their
salary, and control exactly what each person can do.

**Business benefit.** The org chart *is* the permission model — no separate access
spreadsheet to maintain.

**Verified capabilities.** Create, invite, edit, view a member's activity, set
monthly salary, activate/deactivate, grant/revoke login, **blacklist** (keeps the
member and their email locked), and **delete** (frees the email for reuse but keeps
a name tombstone so historical records never go blank). Key Holders, Vendors,
Sub-Contractors, Site Engineers and Project Managers must be assigned at least one
site at creation.

**Status.** Implemented · **Screenshot.** `member-management.png`

### Storage Governance
**Marketing description.** See exactly how much space your documents, photos, logos
and attachments are using — measured to the byte, against your plan's quota.

**Business benefit.** No surprise overage. Every upload is checked against the
quota *before* it is stored, and deleting a file refunds the space immediately.

**Verified.** All uploads pass through one storage service that validates size by
file kind, compresses images, checks the quota, uploads, records a ledger row and
charges the bytes. Deletion reverses all of it.

**Status.** Implemented · **Screenshot.** `settings.png`

---

## 4. Project & Site Management

### Sites (Projects)
**Marketing description.** Every project gets a live command centre: contract
value, current stage, timeline, progress, team, money and documents in one place.

**Business benefit.** A Director can answer "how is Green Valley doing?" in five
seconds instead of five phone calls.

**Verified per-site data.** Name, location/address, contract amount, start and end
dates, current stage (derived from milestones), progress percentage (derived from
tasks), active/completed status, assigned members and subcontractors, photos, and a
per-site health score.

**Status.** Implemented · **Screenshots.** `sites-list.png`, `site-overview.png`

### The Site Hub — 12 tabs
**Marketing description.** One screen per project, with everything that project
touches behind a tab.

**Business benefit.** No hunting across modules. The Site Hub is where a project
manager or site engineer lives all day.

| Tab | What's in it | Screenshot |
|---|---|---|
| **Tasks** | Task dashboard (time-vs-progress curve, completed/pending/delayed), task list grouped by milestone, subtasks | `task-management.png` |
| **Payments & Milestones** | The client payment schedule, milestone-by-milestone | `site-milestones.png` |
| **Finance** | Site wallet: money in, money out, transfers, available balance (Director-only) | `site-finance.png` |
| **Overview** | Site KPI summary | `site-overview.png` |
| **Budget** | Budget vs actual | `site-budget.png` |
| **Expenses** | This site's expense ledger | `expense-management.png` |
| **Payments** | Client payments received against this site | `payments-ledger.png` |
| **Documents** | Site documents by folder | `site-documents.png` |
| **Photos** | Verified site photo gallery | `site-gallery.png` |
| **Attendance** | Who was on site, and when | `site-attendance.png` |
| **Daily Reports** | Structured daily site reports | `daily-reports.png` |
| **Subcontractors** | Subcontractors assigned to this site | `subcontractors.png` |

Tabs appear only where the viewer holds the permission — a Project Manager, for
example, never sees the Payments or Finance tabs.

**Status.** Implemented

### Automatic Site Completion & Health Score
**Marketing description.** Sites mark themselves complete when the work is actually
done, and flag themselves when they go quiet.

**Business benefit.** No stale "in progress" projects sitting in your list forever,
and no site silently going a week without an update.

**Verified.** Site completion is derived, not a manual toggle. The dashboard's
"Attention Required" panel surfaces sites with no progress update in 7+ days. A
Site Health Score component scores each site.

**Status.** Implemented · **Screenshot.** `dashboard-overview.png`

---

## 5. Task Management

**Marketing description.** Break a project into milestones, milestones into tasks,
tasks into subtasks — then assign, track and approve the work.

**Business benefit.** Progress percentages stop being a guess. Every number on the
dashboard traces back to a task somebody actually completed.

**Verified capabilities** (26 endpoints):

- Create, edit, delete tasks and subtasks
- **Multi-assignee tasks** — assign several people to one task
- Seed a site with a default construction task template, or import your own
- Task lifecycle: not started → **start** → **complete** → approve / reject
- Remarks on tasks and subtasks
- **Send Completion Request**: a Site Engineer marks work done, and it enters a
  **Task Completions** approval queue for the PM/Director
- Task analytics per site, and CSV/Excel export of the task list
- Notifications on assignment (`task_assigned`), approval and rejection

**Status.** Implemented · **Screenshot.** `task-management.png`

---

## 6. Milestones & Client Payment Schedule

**Marketing description.** Your milestones *are* your payment schedule. As the work
completes, the client's next payment updates itself.

**Business benefit.** No parallel spreadsheet of "what have they paid, what's due".
The billing stage always matches the site's real progress.

**Verified design.** A milestone is a task *category*. Its start date, end date and
progress are **derived** from the tasks pointing at it — never stored, so they can
never drift. The project's current stage is the first incomplete milestone, and the
Next Payment is the first pending milestone carrying an amount. Directors and
assigned PMs can add, rename, delete, reorder and edit milestone amounts and
remarks, with guards protecting completed work.

**Critical separation.** Tasks are work execution and carry **no payment data ever**.
Milestones are the payment schedule and carry **no task lists**. Milestone payment
fields are stripped from the API response for roles that may not see revenue.

**Status.** Implemented · **Screenshots.** `site-milestones.png`, `milestones-overview.png`

### Additional Payment Requests (Variation Orders)
**Marketing description.** Client asked for something extra? Raise a variation
order, show it to them, and confirm it only when the money actually arrives.

**Business benefit.** Scope creep gets priced and tracked instead of absorbed. And
the books never claim money that hasn't landed.

**Verified rule.** Raising a request changes **nothing** financially. Only a
Director clicking **Mark as Paid** moves money — and that single action raises the
contract value, records one approved Payment (which moves both inflow and available
balance), files it in the site's payment history flagged `additional`, marks the
request Paid and notifies the client. `paid` is terminal.

**Status.** Implemented · **Screenshot.** `client-payments.png`

---

## 7. Attendance Management

**Marketing description.** GPS-verified attendance. Your team checks in from the
site, not from home — and you can prove it.

**Business benefit.** Attendance fraud is the single biggest uncontrolled cost on a
construction site. BuildAlly ties every check-in to a verified location and,
optionally, a selfie.

**Verified capabilities** (7 endpoints):

| Capability | Detail |
|---|---|
| **Check-in / check-out** | GPS-verified, with an explicit state machine (`not_checked_in` → checked in → `checked_out`) |
| **Selfie capture** | Optional per company (`require_attendance_selfie`); enforced server-side, encrypted at rest |
| **My attendance** | The worker's own current status and history |
| **Site attendance roster** | Who was on this site, when, with distance-from-site and GPS accuracy per event |
| **Member attendance calendar** | Month-view per member |
| **Monthly summary** | Days present per member across the company |
| **Auto-checkout** | Optionally closes a forgotten check-in at a company-configured time |
| **Working-week policy** | Company-configured working week drives the working-day count |
| **Salary estimate** | Monthly attendance feeds an estimated-salary view for payroll assumptions |

Every attendance record stores the check-in and check-out location, the distance
from the site centre, and the GPS accuracy of the fix.

**Status.** Implemented · **Screenshots.** `attendance-dashboard.png`,
`attendance-marking.png`, `site-attendance.png`, `mobile-attendance-marking.png`

---

## 8. Geofencing

**Marketing description.** Draw a circle around your site. Attendance only counts
from inside it.

**Business benefit.** Ends "I was there, I promise". The rule is set once per site
and enforced by the server on every single check-in.

### How it works — verified against the Location Verification Engine

BuildAlly has one central location engine. No other module is permitted to compute
distance or decide geofence membership (this is enforced by a guardrail test).

1. **Configure the site.** A Director or Project Manager sets the site's
   coordinates — from their current GPS position, by dropping a pin on a map, or by
   typing them in — plus a **radius** and a **GPS accuracy limit**.
2. **A worker attempts to check in.** The device sends latitude, longitude and the
   GPS fix's accuracy.
3. **The engine evaluates, in order:**
   - Is location verification enabled for this site? → `LOCATION_DISABLED`
   - Does the site have coordinates? → `LOCATION_NOT_CONFIGURED`
   - Did the device return a GPS fix? → `GPS_NOT_AVAILABLE`
   - Is the fix accurate enough? → `GPS_ACCURACY_TOO_LOW`
   - **Haversine great-circle distance** from the site centre, in metres
   - Is `distance <= radius`? → `INSIDE_GEOFENCE`, else `OUTSIDE_GEOFENCE`
4. **Only then** is attendance written — and only after the selfie too, if the
   company requires one.

### Configuration bounds (owner-approved defaults)

| Setting | Default | Allowed range |
|---|---|---|
| Location verification | **On** | on / off per site |
| Geofence radius | 100 m | 20 m – 5,000 m |
| GPS accuracy limit | 30 m | 5 m – 100 m |

A site that is "enabled" but has no coordinates yet reports `LOCATION_NOT_CONFIGURED`
rather than silently allowing check-ins — verification is never accidentally open.

Every location change is written to the append-only audit log with an optional
free-text justification, and the site config shows who last changed it and when.

**Status.** Implemented · **Screenshot.** `site-overview.png`

---

## 9. Geotagging & Verified Photos

**Marketing description.** Site photos that can't be faked — taken live through the
app, stamped with the site, the engineer, the time and the GPS position.

**Business benefit.** Photographic proof of progress that stands up in a client
dispute or a payment claim. A photo from the camera roll cannot enter this flow.

**Verified capabilities.**

- **Camera-only capture.** Verified photos are taken through the app's camera path
  (mobile native camera capture, desktop webcam) — not selected from a gallery.
- **Location verification before capture.** A `POST /site-photos/verify` call runs
  the same geofence engine used by attendance, tagged with purpose `photo`.
- **Server-authoritative watermark.** The burned-in metadata — brand, site name,
  engineer name, capture time — is resolved **server-side** from the authenticated
  session, not taken from the client.
- **GPS accuracy stored** alongside every verified photo.
- **Approval workflow** — photos carry a status and can be approved or rejected.
- **Retention policy** — a configurable `PHOTO_RETENTION_DAYS` with a status
  endpoint and a cleanup run.
- **Map integration** — site coordinates auto-generate a Google Maps deep link;
  the app uses Leaflet for the in-app map picker.

> **Important product distinction to preserve in marketing copy:** the
> **Document Centre** holds uploaded files (drawings, agreements, BOQs). **Verified
> Photos** are camera-only field evidence. "Site Photos" is deliberately *not* a
> document folder. Don't blur these two in website copy.

**Status.** Implemented · **Screenshots.** `site-gallery.png`,
`site-photo-library.png`, `mobile-site-photos.png`

---

## 10. Salary & Payroll Management

**Marketing description.** Attendance-driven payroll for construction teams —
request, approve, generate and issue payslips.

**Business benefit.** The people who know the work (site) raise it, the people who
own the money (Director) approve it, and the numbers come from attendance rather
than memory.

**Verified capabilities.**

| Capability | Detail |
|---|---|
| **Salary requests** | A Site Engineer or Accountant raises; only a Director approves. Creation and approval are separate permissions. |
| **Monthly salary per member** | Set on the member record (`PUT /members/{id}/salary`). |
| **Salary eligibility** | Restricted to Site Engineer, Project Manager and Accountant. Admin is deliberately **not** salary-eligible. Enforced server-side. |
| **Estimated salary from attendance** | Monthly attendance × the company's configured working week produces a salary estimate for payroll assumptions. |
| **Payroll runs** | `POST /payroll/generate` — an Accountant can prepare payroll without approval rights. |
| **Payslips** | Per-member payslip generation and view, branded with the company's own identity. |
| **Incentives** | Add and view per-member incentives on top of base salary. |
| **Salary history** | Full per-member history. |
| **Approved salary becomes an expense** | Categorised `MANPOWER` with `source="salary"`, so the site's cost ledger stays complete. |
| **Reimbursements** | A separate request-and-approve flow for out-of-pocket spend. |

**Status.** Implemented · **Screenshots.** `salary-management.png`,
`payroll-runs.png`, `reimbursements.png`

---

## 11. Company Treasury

**Marketing description.** Your company's working capital, in one ledger — where it
came from, where it went, and what's left.

**Business benefit.** Most construction software tracks project money and stops
there. BuildAlly separates **site money** from **company money**, so a Director can
see actual company liquidity rather than the sum of six project balances.

> **Director-only.** `TREASURY_VIEW` is granted to the Director role alone. No
> other role — including Admin and Project Manager — can reach it, in the UI or the API.

**Verified capabilities** (14 endpoints):

- **Accounts** — modelled as accounts + a directional ledger from day one, so bank
  accounts and petty cash can be added later without a migration
- **Inflows** — director capital, client payment, loan, refund, interest, cash
  returned, other
- **Outflows (company running costs)** — salary, office rent, electricity,
  internet, marketing, equipment, vehicle, office purchase, taxes, insurance, misc
- **Two-way site transfers** — send working capital *to* a site, and receive
  surplus *back from* a site. Both legs are recorded, so a site's balance always
  moves with the treasury's.
- **Pending vs completed** — committed-but-unpaid money is tracked without moving
  the balance
- **Sites holding cash** — which sites are currently sitting on company money
- **Dashboard tiles** — current balance, money received, money spent, pending
  payments, monthly expenses

**Two structural business rules, enforced in the schema.** An outflow never carries
a `site_id` — once money enters the treasury it is pooled and its origin is gone.
And a site transfer must be created from the *site*, so the site's balance moves with
it rather than company money appearing from nowhere.

**Status.** Implemented · **Screenshots.** `treasury-dashboard.png`, `mobile-treasury.png`

---

## 12. Expense Management

**Marketing description.** Site spend, raised by the people on the ground and
approved by the people who own the budget.

**Business benefit.** Costs are captured the day they happen, not reconstructed
from a shoebox of receipts at month end.

**Verified capabilities.**

- **Six frozen categories** — `MANPOWER`, `MATERIAL`, `MISC`, `MANAGERS`,
  `CREDIT`, `PERSONAL`. Writes accept only these six; reads stay tolerant so
  historical records still load.
- **Raise → approve/reject → delete** lifecycle with notifications
- Site Engineers raise ("Expense Requests"); Directors and Project Managers approve
- **Approval threshold** — a company-configured rupee value above which approval
  escalates to the Director
- Expense distribution donut and payments-vs-expenses trend on the dashboard
- Per-site expense ledger inside the Site Hub

**Status.** Implemented · **Screenshots.** `expense-management.png`,
`approval-workflow.png`

---

## 13. Site Finance & Budget

**Marketing description.** Per-project P&L: what the client has paid, what the site
has spent, and what's actually available.

**Business benefit.** Catch a project going underwater while you can still do
something about it.

**Verified.** Available site balance is **derived** — `received − expenses −
transferred` — never stored, so it cannot drift from the ledger. Includes a budget
tab (budget vs actual) and a site finance panel showing inflow, outflow, transfers
and balance.

**Status.** Implemented · **Screenshots.** `site-finance.png`, `site-budget.png`

---

## 14. Document Management

**Marketing description.** Every drawing, agreement, BOQ and invoice for every
project, in folders your team already thinks in.

**Business benefit.** The current revision of the drawing is always the one on
site, and nobody builds from a superseded PDF.

**Verified capabilities** (12 endpoints):

- **Seven folders** — Drawings, Specifications, BOQ, Agreements, Reports, Invoices,
  Other. Config-driven: adding a folder is a one-line backend change with no
  migration and no UI change.
- **Upload** with per-type size limits (separate caps for PDF, Office documents and
  images)
- **Versioning** — upload a new version of an existing document, and browse
  version history
- **Approval workflow** — approve/reject, gated by a `DOCUMENT_APPROVE` permission
  that is separate from `DOCUMENT_MANAGE`
- **Download**, **bulk download** and **bulk delete**
- **Site-scoped document view** plus a company-wide Document Centre
- **Search and filter** — by name, site, approval status, tag, uploader, version
  number and date range
- **Governance** — PM deletion is off by default and must be explicitly enabled per
  company
- **Field-facing subset** — Site Engineers reach Drawings and Specifications only

**Status.** Implemented · **Screenshots.** `document-centre.png`, `site-documents.png`

---

## 15. Daily Reports & Progress

**Marketing description.** A structured daily site report — work done, labour on
site, materials consumed, equipment, issues and tomorrow's plan — with verified
photos attached.

**Business benefit.** A defensible daily record. When a delay claim lands eighteen
months later, you have the day-by-day account.

**Verified daily report structure.**

| Section | Captured |
|---|---|
| Work items | Title, area, progress %, description |
| Labour | Total, masons, helpers, carpenters, electricians, plumbers, others |
| Materials | Material, quantity, unit, notes |
| Equipment | List |
| Issues | Description and impact |
| Tomorrow's plan | Free text |
| Photos | References to existing **verified** site photos — not fresh uploads |

Reports start `pending` (never approved by default) and go through approve/reject.
Alongside this sit two lighter features: **progress updates** (flat progress
entries with their own approval) and **daily updates** (a reminder-driven check-in
with `daily_update_reminder` and `daily_update_missing` notifications at
company-configured slot times).

**Status.** Implemented · **Screenshots.** `daily-reports.png`, `project-activity.png`

---

## 16. Approvals

**Marketing description.** One inbox for every decision waiting on you.

**Business benefit.** Directors stop being the bottleneck, because they stop having
to go looking for what needs signing.

**Verified — five queues:**

| Queue | Source | Approver permission |
|---|---|---|
| **Expenses** | `/expenses` | `EXPENSE_APPROVE` |
| **Payments** | `/payments` | `PAYMENT_APPROVE` |
| **Salary** | `/salary-requests` | `SALARY_APPROVE` |
| **Materials** | `/material-requests` | `MATERIAL_APPROVE` |
| **Task Completions** | `/task-approvals` | task approval |

Each user sees only the queues they can *both* list and act on. Queues load
independently (a failure in one degrades to an empty tab rather than breaking the
page), support **bulk approve**, and update optimistically.

Separate approval flows exist outside this page for **documents**, **site photos**,
**progress updates** and **daily reports**.

**Status.** Implemented · **Screenshot.** `approval-workflow.png`

---

## 17. Reports & Exports

**Marketing description.** Board-ready exports in one click — PDF, Excel, or a live
link into Google Sheets.

**Business benefit.** The numbers your accountant, your bank and your board ask for,
without anyone rebuilding them by hand.

**Verified reports:**

| Report | Format | Contents |
|---|---|---|
| **Site report** | PDF | Per-site summary |
| **Site report** | Excel | Per-site workbook |
| **Site dashboard** | Excel | Site KPIs with payments and expenses sheets |
| **Company executive dashboard** | Excel | Company-wide KPIs aggregated across all sites, with a Site column |
| **Payment receipt** | PDF | Per-payment receipt |
| **Payslip** | PDF | Per-member payslip |
| **Task list export** | CSV/Excel | Per-site task export |
| **Google Sheets live export** ⚠️ | Tokenised URL | A regenerable, revocable link that pulls financial data into Sheets. **Partial — currently broken in the UI**, see below. |

> ⚠️ **Do not market the Google Sheets export until it is fixed.** The backend
> endpoint works (`GET /api/reports/sheets/generate-token`), but the Reports page
> calls `/sheets/generate-token` — without the `/reports` prefix — so it 404s and
> the card renders *"Failed to generate export link"*. This is visible in
> `reports-dashboard.png`. Every other export on that page works. See
> [Appendix B](#appendix-b--known-gaps-found-during-this-audit).

All exports carry the company's own branding (resolved from company settings, with
the company record as fallback) — BuildAlly branding never leaks into a customer's
output.

**Status.** Implemented · **Screenshot.** `reports-dashboard.png`

> **Note.** Reports are deliberately withheld from Site Engineers and Key Holders —
> both the nav item and the route are closed for those roles.

---

## 18. Notifications

**Marketing description.** The right person hears about the thing they need to act
on — in the app, by email, and as a push notification on their phone.

**Business benefit.** Approvals don't sit for three days because nobody knew.

**Verified — 18 notification types:**

| Type | Fires when |
|---|---|
| `expense_approval` | An expense needs a decision |
| `payment_approval` | A payment needs a decision |
| `salary_approval` | A salary request needs a decision |
| `material_request` | A material request is raised |
| `site_assignment` | A member is assigned to a site |
| `document_approval` | A document needs a decision |
| `member_activation` | A member is activated |
| `member_deactivation` | A member is deactivated |
| `support_update` | A support ticket is updated |
| `progress_update` | A progress update is submitted |
| `task_assigned` | A task or subtask is assigned (only newly-added assignees are notified) |
| `task_approved` | A task completion is approved |
| `task_rejected` | A task completion is rejected |
| `daily_update_reminder` | A configured daily-update slot arrives |
| `daily_update_missing` | A slot passes unmet |
| `complaint` | A client raises a complaint (routed to Director/PM), and on reply back to the client |
| `billing_reminder` | Trial countdown (3 days / 1 day / last day / expired) and renewal warnings — Directors and Admins only |

**Delivery channels.** In-app Notification Centre with unread and pending counts,
mark-one-read and mark-all-read; **Web Push** via VAPID with per-device subscription
management and automatic pruning of dead subscriptions; and **email**.

**Email sender identity.** All mail leaves from one mailbox so replies always land
in the same inbox, with the display name varying by category — Authentication,
Security, Team, Billing, Support, or the bare brand. One env var re-points or
white-labels every outgoing email.

**Announcements.** Platform news can be published and surfaced in-app.

**Status.** Implemented · **Screenshot.** `notifications.png`

---

## 19. Dashboards

Each role lands on a dashboard built for that role's job.

| Dashboard | Who | What it shows | Screenshot |
|---|---|---|---|
| **Company Overview** | Director, Admin | Total expenses, payments received, active sites, pending approvals, total members, pending salary approvals; expense distribution donut; payments-vs-expenses trend; **Attention Required**; **Upcoming Actions** | `dashboard-overview.png` |
| **Accountant view** | Accountant | The same shell, scoped to salary, payroll and reporting | `accountant-dashboard.png` |
| **Site Engineer command centre** | Site Engineer | Site picker, then: pending tasks, my pending approvals, today's attendance, photos awaiting approval, site progress, quick actions (Tasks, Attendance, Submit Expense, Request Salary, Reimbursement), my activity, company contact | `site-engineer-dashboard.png`, `site-engineer-command-centre.png` |
| **Project Manager command centre** | Project Manager | Assigned-site operational view — costs and execution, never revenue | `project-manager-dashboard.png` |
| **Key Holder / client portal** | Key Holder | See [Client Portal](#20-client-portal-key-holder) | `key-holder-dashboard.png` |
| **Sub-Contractor dashboard** | Sub-Contractor | Their assignments and their own payment ledger only | `subcontractor-dashboard.png` |
| **Site dashboard** | Any permitted role | The 12-tab Site Hub | `site-overview.png` |
| **Finance dashboard** | Director | Company Treasury | `treasury-dashboard.png` |
| **Super Admin Control Tower** | BuildAlly staff | See [Super Admin](#23-super-admin-control-tower) | `super-admin-dashboard.png` |

**Status.** Implemented

---

## 20. Client Portal (Key Holder)

**Marketing description.** Give your client their own beautiful, read-only view of
their project — progress, milestones, photos, payments and a direct line to you.

**Business benefit.** This is the feature clients tell their friends about. It
replaces the weekly "any update?" phone call with a portal they can check
themselves, and it makes a contractor look markedly more professional than
competitors sending WhatsApp photos.

**Verified — the Key Holder dashboard includes:**

- A welcome hero with the project name, location, status and a **progress ring**
- **Total Amount** (project value), **Amount Paid** (with % of total),
  **Outstanding**, and **Next Payment** with its due date
- **Project Progress** — overall completion %, current stage, days remaining,
  start date, expected completion
- **Milestone Timeline** — every milestone with Paid / Current / Upcoming status
- **Current Billing Stage** — amount, payment status, due date, billing window
- **Raise a Complaint** — routed to the Director and Project Manager, with
  notifications back to the client when they respond
- Dedicated nav: My Dashboard, Payments, Site Hub, **Photo Library**, Document
  Centre, **Contact Us** (showing the assigned PM and Director), Notifications,
  My Profile
- Additional payment requests (variation orders) visible to the client
- Analytics, activity feed and quick actions

The client portal sidebar is intentionally force-dark navy as a premium design
choice, in both light and dark themes.

**Status.** Implemented · **Screenshots.** `key-holder-dashboard.png`,
`client-payments.png`, `site-photo-library.png`, `mobile-key-holder-dashboard.png`

---

## 21. Vendors, Materials & Subcontractors

| Feature | Marketing description | Status | Screenshot |
|---|---|---|---|
| **Vendor directory** | Your suppliers, their documents and their payments in one place. | Implemented | `vendors.png` |
| **Material requests** | Site raises a material request; it flows into the Approvals inbox. | Implemented | `vendors.png` |
| **Material lifecycle** | A stepper tracks a material request from request through to delivery. | Implemented | `vendors.png` |
| **Subcontractor management** | Add subcontractors, assign them to sites, track pending assignments. | Implemented | `subcontractors.png` |
| **Subcontractor self-service** | Subcontractors see only their own assignments and their own payment ledger — no company-wide payments or reports. | Implemented | `subcontractor-dashboard.png` |
| **Complaint inbox** | Client complaints routed to Director and Project Manager. | Implemented | `complaints-inbox.png` |

---

## 22. Billing & Subscription

**Marketing description.** Start with a ₹999 seven-day trial that's credited back
in full, then pick the plan that fits how you build.

**Business benefit.** The trial is paid, which filters out tyre-kickers, but it
costs the customer nothing in the end — the ₹999 comes straight off their first
subscription.

### The commercial model (verified — `plans.py` is the single source of truth)

There is **no free tier**. A workspace is activated exactly one of two ways:

1. **Paid 7-day trial — ₹999.** Full feature access, capped at 5 active sites and
   2 GB. The ₹999 is banked as an account **credit** and deducted in full from the
   first subscription purchase.
2. **Direct subscription** — Interior or Builder, monthly or annual. No trial, no
   ₹999, and therefore no credit.

### Plans

| | **BuildAlly Interior** | **BuildAlly Builder** | **BuildAlly Enterprise** |
|---|---|---|---|
| **For** | Interior designers, renovation contractors, small builders | Construction companies, civil contractors, turnkey/residential/commercial builders | Large organizations |
| **Monthly** | ~~₹3,800~~ **₹2,899** (24% off) | ~~₹6,000~~ **₹4,499** (25% off) | Custom |
| **Annual** | ~~₹39,000~~ **₹29,999** (23% off) | ~~₹65,000~~ **₹49,999** (23% off) | Custom |
| **Active sites** | 7 | 12 | Unlimited |
| **Members** | Unlimited | Unlimited | Unlimited |
| **Storage** | 25 GB | 75 GB | Unlimited |
| **Badge** | — | **Recommended** | **Coming Soon** |

Trial: ₹999 · 7 days · 5 active sites · 2 GB · full feature access · ₹999 credited
toward any subscription · *your data is never deleted if you don't subscribe*.

> Prices carry a **"Limited Period Offer"** label. Site caps count **active** sites
> only — completing a site frees its slot.

### Lifecycle

**Verified states.** `PENDING_PAYMENT` → `TRIAL` / `ACTIVE` → `PAST_DUE` /
`EXPIRED` / `CANCELLED` / `SUSPENDED`. A paid subscription gets a **5-day grace
period** past its renewal date, during which the tenant is warned but can still
work. After that the workspace goes **read-only**: it can still log in, read
everything, contact support and pay — but every mutating request is blocked.

**Payments.** Razorpay integration with server-side order creation, signature
verification, webhooks (HMAC-verified), invoices, payment history and a credit
ledger.

**Status.** Implemented · **Screenshot.** `billing.png`

---

## 23. Super Admin Control Tower

> **Internal — BuildAlly platform staff only.** This section is documented for
> completeness. **Do not market these screens to customers.** The Super Admin role
> is deliberately not creatable through any tenant API.

**Verified — 38 endpoints across 11 screens:**

| Screen | Capability | Screenshot |
|---|---|---|
| **Overview** | MRR, ARR, paying customers, total customers, trials, churn rate, collected this month, outstanding; MRR growth, customer growth, plan distribution, churn trend | `super-admin-dashboard.png` |
| **Companies** | Every tenant; activate, suspend, archive, reactivate, convert to paid, set a custom price, mark as pilot, extend trial | `super-admin-companies.png` |
| **Subscriptions** | Change plan, extend, cancel, resume, terminate | `super-admin-subscriptions.png` |
| **Trials** | Trial pipeline and extensions | `super-admin-trials.png` |
| **Revenue** | Revenue dashboard | `super-admin-revenue.png` |
| **Conversions** | Trial-to-paid conversion analytics | `super-admin-conversions.png` |
| **Payments / Billing / Invoices** | Payment history; mark an invoice paid or cancel it | `super-admin-billing.png` |
| **Trial Credits** | Banked credit across tenants | — |
| **Audit** | Cross-tenant append-only audit log | `super-admin-audit.png` |
| **Infrastructure** | Platform health | `super-admin-infrastructure.png` |
| **Demo Requests** | Sales leads through NEW → CONTACTED → SCHEDULED → CONVERTED/CLOSED | `super-admin-demo-requests.png` |
| **Support Center** | Cross-tenant support tickets | `super-admin-support.png` |
| **Impersonation** | 30-minute support impersonation of a tenant, with a persistent on-screen banner | — |
| **Attention** | Tenants needing intervention | — |

**Status.** Implemented (Internal)

---

## 24. Mobile Experience

**Marketing description.** Built for the site, not just the site office. Everything
a field engineer needs works on a phone.

**Business benefit.** The people generating the data — engineers, supervisors — are
never at a desk. If it doesn't work on a phone, it doesn't get recorded.

**Verified.**

| Capability | Detail | Screenshot |
|---|---|---|
| **Responsive layout** | Tailwind breakpoints throughout; the desktop sidebar is replaced by a mobile header and drawer | `mobile-dashboard.png` |
| **Mobile navigation** | Slide-out drawer with the same permission-filtered nav | `mobile-navigation.png` |
| **Bottom tab bar** | A persistent five-slot bottom nav on mobile (e.g. Notifications · Documents · My Dashboard · Payments · More) | `mobile-key-holder-dashboard.png` |
| **Quick-add FAB** | Floating action button for the most common create action | — |
| **Sync status indicator** | Shows when queued offline work is syncing | — |
| **Push opt-in** | In-app prompt to enable web push on the device | — |
| **Mobile dashboards** | Every role dashboard reflows to a single column | `mobile-site-engineer-command-centre.png` |
| **Mobile attendance** | GPS check-in with selfie, straight from the phone | `mobile-attendance-marking.png` |
| **Mobile site photos** | Native camera capture for verified photos | `mobile-site-photos.png` |
| **Mobile Site Hub** | The full 12-tab hub, scrollable tab strip | `mobile-site-hub.png` |
| **Mobile client portal** | The Key Holder portal on a phone | `mobile-key-holder-dashboard.png` |
| **Install to home screen** | PWA install prompt with app shortcuts | — |
| **Offline** | Offline screen and a queue that replays actions on reconnect | — |
| **Touch and zoom** | Dedicated mobile touch/zoom handling (covered by tests) | — |

**Status.** Implemented

---

## 25. Support & Help

| Feature | Detail | Status | Screenshot |
|---|---|---|---|
| **Help & Support** | In-app help centre. Director and Admin only — it's an internal helpdesk, deliberately hidden from clients and field roles. | Implemented | `help-support.png` |
| **Support tickets** | Raise a ticket with attachments; see your own tickets; `support_update` notifications on reply. | Implemented | `help-support.png` |
| **Book a Demo** | Public lead-capture form; notifies the BuildAlly team and lands in the Super Admin pipeline. No anonymous workspace access is ever granted. | Implemented | `book-demo.png` |
| **Contact Sales** | Enterprise enquiry route from the billing page. | Implemented | `billing.png` |
| **Customer Success widget** | In-app success surface. | Implemented | `dashboard-overview.png` |
| **Welcome dialog** | First-login orientation, shown once. | Implemented | — |
| **Onboarding wizard** | Guided workspace setup. | Implemented | — |

---

## Key Selling Points

Ordered for the marketing site — strongest differentiators first. Every one of
these is live in the product today.

1. **GPS-Verified Attendance with Geofencing** — Workers check in from inside a
   radius you set per site, with distance and GPS accuracy recorded on every
   event. The single strongest ROI story BuildAlly has.
2. **Tamper-Proof Photo Documentation** — Camera-only verified site photos,
   watermarked server-side with site, engineer, time and GPS. Not a camera-roll
   upload — evidence.
3. **A Premium Client Portal** — Give your client a live view of their project:
   progress ring, milestone timeline, payment schedule and photo library. Wins
   deals before you've started building.
4. **Company Treasury, Separate from Site Money** — See your actual working
   capital, not the sum of six project balances. Two-way site transfers, full
   ledger, Director-only.
5. **Milestones That Are the Payment Schedule** — Progress and billing stay in
   lockstep because the milestone derives its dates and progress from real tasks.
6. **Nine-Role Access Control, Enforced Server-Side** — Your PM runs the site
   without ever seeing client revenue. Your client sees their project and nothing
   else.
7. **Attendance-Driven Payroll** — Estimated salary from real attendance, a
   separation between preparing and approving payroll, and branded payslips.
8. **Full Approval Workflow** — Expenses, payments, salary, materials, task
   completions, documents, photos and daily reports — all with a configurable
   escalation threshold.
9. **Structured Daily Site Reports** — Work, labour, materials, equipment, issues,
   tomorrow's plan, with verified photos attached. A defensible daily record.
10. **Secure Document Management with Versioning** — Seven folders, version
    history, approval workflow, bulk operations and per-plan storage quotas.
11. **Board-Ready Reporting** — PDF and Excel exports, a company executive
    dashboard workbook, and a live Google Sheets link — all under your own branding.
12. **Multi-Tenant Cloud Platform** — Isolated workspace per company, with
    site-level access enforcement on top.
13. **Mobile-First PWA** — Install from the browser, works offline, native camera
    and GPS. No app store.
14. **Web Push + Email Notifications** — 18 notification types so approvals never
    stall.
15. **Flexible Secure Authentication** — Password, Google SSO, magic links, OTP,
    "remember this device", plus grant/revoke login control.

---

## Features Implemented but Not Marketed

These are built, working, and materially valuable — and they currently get little
or no visibility. Each is a candidate for a marketing-site section.

### 1. Company Treasury
**Why it deserves visibility.** This is a genuine category differentiator. Most
construction management tools track project money only. BuildAlly's deliberate
separation of pooled company working capital from per-site funds — with two-way
transfers and a full directional ledger — is the kind of thing a Director
recognises instantly as "built by someone who has run a construction business."
**Suggested treatment.** Its own page, with the `treasury-dashboard.png` hero.

### 2. The Key Holder Client Portal
**Why it deserves visibility.** This is the feature that makes a contractor look
better to *their* customer. It's a sales tool the contractor can use in their own
pitch — "you'll get a live portal for your project." That is a reason to buy that
has nothing to do with internal efficiency.
**Suggested treatment.** A dedicated "Impress Your Clients" page built around
`key-holder-dashboard.png`.

### 3. Structured Daily Reports
**Why it deserves visibility.** Labour headcount by trade, materials consumed,
equipment, issues with impact, tomorrow's plan — this is far richer than the
"daily log" competitors advertise, and it's the artefact that wins delay claims.
**Suggested treatment.** A feature block under Project Management, with the field
breakdown shown as a table.

### 4. Approval Threshold Escalation
**Why it deserves visibility.** A configurable rupee value above which approval
escalates to the Director is exactly the control a growing company starts needing
at around ₹5 Cr turnover. It's a "we've thought about your governance" signal.
**Suggested treatment.** A line in the Approvals section and a bullet on the
pricing page.

### 5. Document Versioning & Approval
**Why it deserves visibility.** "Building from a superseded drawing" is a
million-rupee mistake every contractor has made. Version history plus a separate
`DOCUMENT_APPROVE` permission directly addresses it, and the site currently doesn't
say so.
**Suggested treatment.** Reframe the Documents section around *revision control*,
not storage.

### 6. Task Completion Requests
**Why it deserves visibility.** The "Site Engineer requests, PM/Director approves"
loop is the mechanism that makes progress percentages trustworthy. Without it,
progress is self-reported. That's the argument for why BuildAlly's dashboard
numbers can be believed.
**Suggested treatment.** A "Progress you can trust" block next to Task Management.

### 7. Web Push Notifications
**Why it deserves visibility.** Push on a phone with no app store install is
genuinely impressive to a non-technical buyer, and it's the answer to "will my team
actually respond?"
**Suggested treatment.** A bullet in the Mobile section.

### 8. Storage Governance & Compression
**Why it deserves visibility.** Byte-accurate quota metering with automatic image
compression, a per-kind breakdown and instant refund on delete is unusually
rigorous. It also makes the plan storage limits feel fair rather than arbitrary.
**Suggested treatment.** A footnote on the pricing page explaining how storage is
measured.

### 9. Offline Queue
**Why it deserves visibility.** Indian construction sites lose signal constantly.
"It keeps working when the signal doesn't" is a concrete, believable field promise.
**Suggested treatment.** A bullet in the Mobile section.

### 10. Google Sheets Live Export — *fix first*
**Why it deserves visibility.** Every finance team in this segment lives in
spreadsheets. A revocable, regenerable live link into Sheets meets them where they
are instead of fighting them.
**Suggested treatment.** A bullet in Reports — **but only after the frontend path
bug in Appendix B item 2 is fixed.** Today the feature cannot be used from the UI.

### 11. White-Label Branding on Customer-Facing Output
**Why it deserves visibility.** Reports, receipts, payslips and exports carry the
customer's own logo, name and footer — and BuildAlly branding is explicitly
prevented from leaking in as a fallback. That's already partial white-labelling,
shipped today, and it's currently uncommunicated.
**Suggested treatment.** A line in Company Settings and on the pricing page.
**Careful with wording** — full white-label (custom domain, removing BuildAlly
everywhere) is an Enterprise *Coming Soon* item. Say "your branding on every
document your client sees", not "white-label platform".

### 12. Member Blacklist vs Delete
**Why it deserves visibility.** Blacklisting locks a member and their email;
deleting frees the email but keeps a name tombstone so historical records never go
blank. In an industry with high churn and rehiring, that distinction matters.
**Suggested treatment.** A line in Member Management.

---

## Planned Features

> **Everything below is NOT yet implemented.** Mark it clearly as **Coming Soon**
> wherever it appears on the marketing site, and never mix it into a live feature
> section.

| Feature | Status | Notes |
|---|---|---|
| **BuildAlly Enterprise plan** | Coming Soon | Present in the plan catalog with `coming_soon: true` and a **Contact Sales** CTA instead of a price. Unlimited sites, unlimited storage. |
| **Full white-label branding** | Coming Soon | Listed as an Enterprise feature. Report/payslip branding already ships (see above); custom domain and complete platform white-labelling do not. |
| **SSO readiness (enterprise IdP)** | Coming Soon | Listed as an Enterprise feature. Google SSO ships today; enterprise IdP integration does not. |
| **Dedicated support & custom onboarding** | Coming Soon | Enterprise plan feature. |
| **Cloudflare R2 storage** | Coming Soon | The storage layer is already provider-abstracted (Cloudinary today, local disk in dev), so an R2 provider slots in without a migration. Not built. |
| **Storage add-ons** | Coming Soon | No add-on purchase path exists; quotas are per-plan only. |
| **API integrations / public API** | Coming Soon | The REST API exists but is not documented, versioned or exposed as a customer-facing product. |
| **Advanced analytics** | Coming Soon | Beyond today's dashboards, task analytics and conversion metrics. |
| **Multiple treasury accounts (bank / petty cash)** | Coming Soon | The data model already supports `bank` and `petty_cash` account types; only the default company fund is created and no UI exists to add more. |
| **Main-entrance geofence point** | Coming Soon | Accepted and stored on the site location config as a reserved field; no verification logic uses it yet. |
| **Additional verification purposes** | Coming Soon | The engine's `VerificationType` enum reserves `inspection`, `delivery` and `visitor`. Only `attendance` and `photo` are wired up. |
| **Inventory management** | Coming Soon | `INVENTORY_VIEW` / `INVENTORY_MANAGE` permissions exist in the catalog; no inventory module is built. |

---

## Appendix A — Screenshot Index

All 66 images live in `docs/marketing-assets/`. Desktop shots are 1600×1000 at 2×
(3200×2000). Mobile shots are 414×896 at 3× (1242×2688).

**Public / authentication (3)** — `login-screen`, `register-company`, `book-demo`

**Dashboards (6)** — `dashboard-overview`, `accountant-dashboard`,
`site-engineer-dashboard`, `site-engineer-command-centre`,
`project-manager-dashboard`, `subcontractor-dashboard`

**Company (5)** — `member-management`, `settings`, `billing`, `my-profile`,
`notifications`

**Sites & projects (9)** — `sites-list`, `site-overview`, `site-budget`,
`site-finance`, `site-documents`, `site-gallery`, `site-attendance`,
`site-milestones`, `project-activity`

**Tasks & milestones (2)** — `task-management`, `milestones-overview`

**Attendance (2)** — `attendance-dashboard`, `attendance-marking`

**Finance (5)** — `treasury-dashboard`, `expense-management`, `payments-ledger`,
`salary-management`, `payroll-runs`

**Workflow (4)** — `approval-workflow`, `reimbursements`, `daily-reports`,
`complaints-inbox`

**Documents & reports (2)** — `document-centre`, `reports-dashboard`

**Client portal (3)** — `key-holder-dashboard`, `client-payments`,
`site-photo-library`

**Vendors & subcontractors (2)** — `vendors`, `subcontractors`

**Support (1)** — `help-support`

**Super Admin — internal, do not publish (11)** — `super-admin-dashboard`,
`super-admin-companies`, `super-admin-revenue`, `super-admin-subscriptions`,
`super-admin-trials`, `super-admin-billing`, `super-admin-conversions`,
`super-admin-audit`, `super-admin-infrastructure`, `super-admin-support`,
`super-admin-demo-requests`

**Mobile (11)** — `mobile-login`, `mobile-dashboard`, `mobile-navigation`,
`mobile-site-engineer-dashboard`, `mobile-site-engineer-command-centre`,
`mobile-attendance-marking`, `mobile-site-hub`, `mobile-site-photos`,
`mobile-treasury`, `mobile-key-holder-dashboard`, `mobile-my-profile`

---

## Appendix B — Known Gaps Found During This Audit

Flagged so the marketing site doesn't inherit them. These are product observations,
not blockers — **no application code was changed by this audit.**

1. **Non-privileged roles show "Not activated" and generic branding.**
   `GET /api/company-settings` returns **403** for Site Engineer and Key Holder.
   `BrandingContext` and `SubscriptionContext` both read from that one response, so
   those roles render the fallback brand "BuildAlly" instead of the company name,
   and a **"Not activated"** subscription badge on a fully active workspace. Visible
   in `attendance-marking.png`, `site-engineer-command-centre.png` and
   `key-holder-dashboard.png`. **This is the single most damaging issue for
   marketing screenshots** — the client portal, the flagship demo screen, tells the
   client the workspace isn't activated. Worth fixing before the site ships.

2. **Google Sheets export is broken in the UI.** `Reports.js` calls
   `API.get('/sheets/generate-token')` and `('/sheets/regenerate-token')`, but the
   reports router is mounted under `/reports`, so the real paths are
   `/api/reports/sheets/generate-token` and `/api/reports/sheets/regenerate-token`.
   The call 404s every time and the card shows *"Failed to generate export link"*,
   which makes Copy URL and Download Excel in that card unusable. Verified by
   direct probe: the unprefixed path returns **404**, the prefixed path returns
   **200**. A one-line frontend fix. Every other export on the page (site PDF, site
   Excel, site dashboard Excel, company dashboard Excel) uses the correct
   `/reports/...` prefix and works.

3. **`/project-dashboard` is unreachable.** The component reads `siteId` from
   `useParams()`, but the route is registered without a parameter, so it always
   renders "Project not found". Excluded from the screenshot set.

4. **Super Admin header overlaps its nav** at 1600px — the "BuildAlly Control
   Tower" title is clipped by the nav bar. Internal-only screen, so low urgency.

5. **Super Admin Control Tower reads ₹0 MRR** in the screenshots because the demo
   database holds a single pilot tenant. Real, not a bug — just don't use these as
   marketing material (they're internal anyway).

6. **`seed_preview.py` does not seed Treasury data.** Treasury transactions for
   these screenshots were created separately through the real API. Worth adding to
   the seeder so future preview tenants show a populated Treasury.

---

## Appendix C — Screenshot Provenance

Every screenshot is the **real application UI**, not a mockup. To reproduce or
refresh them:

1. **Isolated database.** `backend/.env` points at the production Atlas cluster, so
   it was **not** used. A throwaway local MongoDB was run on port 27018 with its own
   data directory, and environment variables were exported to override `MONGO_URL`,
   `DB_NAME` and `ENVIRONMENT` (`load_dotenv` does not override already-set process
   env, so exported values win). Cloudinary, Razorpay, Resend, Sentry and Google
   OAuth credentials were all blanked so nothing external was contacted.
2. **Backend.** Launched through a small wrapper that strips the hardcoded
   `tlsCAFile` from the Motor client — correct for Atlas, wrong for a plain local
   mongod. **No repository file was modified.**
3. **Demo data.** `python -m scripts.seed_preview --reset` — the project's own
   preview seeder. It creates *Skyline Infra Developers Pvt. Ltd.* with 6 sites,
   19 members across every role, 60 milestones, 198 tasks, 167 daily reports,
   216 site photos, 388 attendance records, 91 expenses, 25 payments, 22 salary
   requests, 105 documents and 22 notifications. Treasury activity was then added
   through the live API.
4. **Super admin.** `python -m scripts.seed_super_admin`.
5. **Capture.** Playwright driving the installed Google Chrome, logging in as
   Director, Project Manager, Site Engineer, Accountant, Key Holder, Sub-Contractor
   and Super Admin in turn.

**No production data appears in any screenshot.** Every figure, name and project is
from the seeded demo tenant.

**Refresh checklist when the UI changes**

- [ ] Re-run the seeder so the data still looks realistic
- [ ] Re-capture the affected screens at 1600×1000 @2× (desktop) or 414×896 @3× (mobile)
- [ ] Force the sidebar expanded (`localStorage.buildally_sidebar_collapsed = 'false'`) — the collapsed rail reads poorly in marketing shots
- [ ] Dismiss the first-login welcome dialog (`bm_welcomed_<userId> = '1'`)
- [ ] Check that pages gated behind a site picker have a site selected
- [ ] Update the affected rows and the screenshot index in this document
