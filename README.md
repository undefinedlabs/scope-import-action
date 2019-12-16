![logo](scope_logo.svg)

# Scope for JUnit Action

GitHub Action to import your JUnit XML reports to [Scope](https://scope.dev)

## About Scope

[Scope](https://scope.dev) gives developers production-level visibility on every test for every app – spanning mobile, monoliths, and microservices.

## Usage

1. Set Scope DSN inside Settings > Secrets as `SCOPE_DSN`.
2. Add a step to your GitHub Actions workflow YAML that uses this action:

```yml
  - name: Scope JUnit
    uses: undefinedlabs/scope-for-junit-action@v1
    with:
      dsn: ${{ secrets.SCOPE_DSN }}
      path: path/to/test-reports
```