#!/usr/bin/env bash
# Usage: task.sh <token_uuid> <number>
# Simulates a flaky task: ~90% success, ~7% failure, ~3% crash (no output).

TOKEN="$1"
NUMBER="$2"

if [[ -z "$TOKEN" || -z "$NUMBER" ]]; then
    echo "Usage: $0 <token_uuid> <number>" >&2
    exit 64
fi

# Random sleep between 1 and 5 seconds (can be fractional)
sleep "$(awk -v min=1 -v max=5 'BEGIN{srand(); printf "%.1f", min + rand() * (max - min)}')"

ROLL=$((RANDOM % 100))

if (( ROLL < 90 )); then
    echo "SUCCESS token=${TOKEN} number=${NUMBER}"
    exit 0
elif (( ROLL < 97 )); then
    echo "ERROR token=${TOKEN} number=${NUMBER} failed to process" >&2
    exit 1
else
    # Crash: terminate abruptly with no output
    kill -9 $$
fi
