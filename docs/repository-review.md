# Public repository review

Reviewed 15 November 2026. Static portfolio metadata reflects source inspection, not execution of these projects. No GitHub token is needed at site runtime. No private repository was read.

| Repository                                                                | Branch | Inspected tree                             |
| ------------------------------------------------------------------------- | ------ | ------------------------------------------ |
| [PerdaRide-App](https://github.com/manman040/PerdaRide-App)               | main   | `e61682c84c7e11635806b2209ac05e3033b5b999` |
| [AdminUrbanDrive](https://github.com/manman040/AdminUrbanDrive)           | main   | `60d8169a5214c7aad8fbdee013e9f67cdf89c8c3` |
| [urbandrive-toyyibpay](https://github.com/manman040/urbandrive-toyyibpay) | main   | `c007b79077b12c793e1658c8c754d5027101caa4` |
| [readytech](https://github.com/manman040/readytech)                       | main   | `57f41315c6f745ac724537fb851109cdb6950c2d` |
| [SteelFit](https://github.com/manman040/SteelFit)                         | master | `39a36ca796d1fb56a12a76f612c43e590b44245f` |

## Findings

- Urban Drive / PerdaRide: pubspec describes the Flutter remake. BookingRepository writes and streams Firebase bookings. ToyyibPayService calls `/api/toyyibpay/create-bill`, implemented in the Express service. The PHP ride-management page explicitly maps the mobile booking fields. These references justify grouping the three repositories, without claiming an independently tested live integration.
- ReadyTech: README, Flutter dependencies, AuthBloc, admin technician actions, lifecycle SQL, and matching SQL were inspected. The website describes code-supported foundation functionality. README test counts, performance claims, and future phases are not represented as verified outcomes.
- SteelFit: Gradle, Login, BookingActivity, BookingAdapter, ManageTrainer, ViewBooking, and the file tree were inspected. jTDS and queries establish SQL Server/JDBC usage. Trainer records are fetched on a worker thread; the adapter renders image bytes. ViewBooking and ManageTrainer are scaffolding, so a completed booking system is not claimed. Login, registration, trainer listing, and adding a trainer are implemented; the selected trainer photo is not saved. No README was present in the inspected tree.
- No application screenshots were found in the reviewed trees. SteelFit artwork is copied from `app/src/main/res/drawable/steelfit.png` and labeled repository artwork. Other previews are CSS concept illustrations.
- No repository homepage or release provided a verified live demonstration URL. Deployment API information was unavailable through the connector; this is not evidence that no deployment exists. No external application backend or payment endpoint was exercised.
- The five user-selected repositories were prioritized; no unrelated repositories were automatically added.

Each case study includes direct source-file references. Edit project content in `src/data/projects.ts`; employment and internship contributions remain in `src/data/portfolio.ts`.

## Supplied report follow-up

The developer subsequently supplied the final Urban Drive DOCX report. Its application screenshots and documented academic workflow now supplement the repository review. Six selected captures are shown in the gallery; the original DOCX remains local. The developer confirmed a small pilot involving 15 users and 5 drivers. Counts are self-reported, with no assumed duration, deployment scale, or measured improvement. The report’s future suggestions are kept separate from existing functionality. Earlier notes about missing repository screenshots remain accurate for the repository trees, but no longer mean the portfolio lacks Urban Drive screenshots.
