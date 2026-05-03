# КНБ: Тактическое противостояние - Specification

## Project Overview
- **Project Name**: Tactical RPS (КНБ: Тактическое противостояние)
- **Type**: Browser-based card strategy game
- **Core Functionality**: Rock-Paper-Scissors card game with Joker mechanics, scouting ability, and AI opponent
- **Target Users**: Casual gamers looking for quick strategic gameplay

## UI/UX Specification

### Layout Structure
- **Main Menu**: Centered start button, settings toggle
- **Battle Screen**:
  - Top: Enemy cards (face-down), enemy score, round counter
  - Center: Collision zone for played cards
  - Bottom: Player hand (10 cards in fan), player score, scouting button
- **Game Over**: Final score, replay button

### Visual Design
- **Color Palette**:
  - Background: #0a0a1a (deep dark)
  - Neon Orange: #ff6b2c
  - Neon Cyan: #00f5d4
  - Neon Lime: #7cff2c
  - Neon Magenta: #ff2c8a
  - Card Back: #1a1a3a with cyan glow
  - Text: #ffffff

- **Typography**:
  - Font: "Orbitron" (Google Fonts) for headings
  - Secondary: "Rajdhani" for scores/numbers

- **Visual Effects**:
  - Neon glow on cards and buttons (box-shadow with color)
  - Card trail effect on play
  - Flash animation on card collision
  - Glitch effect on Joker activation
  - Pulsing glow on interactive elements

### Components
- **Cards**: 120x170px, rounded corners, icon in center, type indicator
- **Buttons**: Neon border, hover glow effect, press animation
- **Score Display**: Large numeric display with glow
- **Scouting Modal**: Shows 3 random enemy cards

## Functionality Specification

### Core Features
1. **Deck Generation**: Random 9 base cards + 1 Joker per player
2. **Card Play**: Click to select card, both cards animate to center
3. **Scouting**: One-time use, reveals 3 random enemy cards, disables attack that round
4. **Joker Mechanics**:
   - Copycat: Copies enemy card value (guaranteed draw)
   - Risk Strike: Predict enemy card, +2 if correct, auto-loss if wrong
   - Two Jokers: Both get 0 points, glitch effect
5. **Scoring**:
   - Win: +1 point
   - 3-win streak: +2 bonus on 3rd win
   - Draw/Loss: 0 points
6. **AI Behavior**:
   - Remembers player's played cards
   - Analyzes remaining cards in player's hand
   - Saves Joker for strategic moments

### User Interactions
- Click card to play
- Click scouting button to activate
- Click Joker mode buttons when Joker is played
- Click restart to play again

## Acceptance Criteria
- [ ] Game loads without errors
- [ ] 10 cards dealt to each player
- [ ] Cards can be selected and played
- [ ] Scoring works correctly
- [ ] Scouting reveals 3 random enemy cards
- [ ] Joker modes work as specified
- [ ] AI makes intelligent decisions
- [ ] Visual effects work (glow, animations, glitch)
- [ ] Game ends after 10 rounds with final score
- [ ] Replay functionality works