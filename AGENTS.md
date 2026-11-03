# DevDay contribution rules

- Use test-driven development for behavior changes. Add or identify an observable test and run it to see the expected failure before editing production code.
- Make the smallest change that passes the test, then refactor with tests green. Keep assertions focused on user-visible behavior.
- Record the red and green commands and results in the exercise report. For configuration changes, demonstrate the check with an input that must fail and one that must pass.
- Run `npm run check` before handing off. Use Conventional Commits and commit each coherent feature separately.
- Keep SonarQube local. Keep credentials and generated reports out of Git. Review visual diffs before accepting new baseline images.
