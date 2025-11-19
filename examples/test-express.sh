#!/bin/bash
# Quick test script for Express rate limiter

echo "🧪 Testing Express Rate Limiter"
echo "================================"
echo ""

# Test endpoint 1: Public API (5 requests per minute)
echo "Test 1: Public API (5 requests per minute)"
echo "Making 7 requests to http://localhost:3000/api/public/data"
echo ""

for i in {1..7}; do
  echo "Request $i:"
  curl -s http://localhost:3000/api/public/data | jq '.'
  echo ""
  sleep 0.5
done

echo ""
echo "================================"
echo ""

# Test endpoint 2: Protected API (3 requests per 30 seconds)
echo "Test 2: Protected API (3 requests per 30 seconds)"
echo "Making 5 requests to http://localhost:3000/api/protected/data"
echo ""

for i in {1..5}; do
  echo "Request $i:"
  curl -s http://localhost:3000/api/protected/data | jq '.'
  echo ""
  sleep 0.5
done

echo ""
echo "✅ Test complete! Check the responses above."
echo "You should see 429 errors for requests that exceeded the limit."
