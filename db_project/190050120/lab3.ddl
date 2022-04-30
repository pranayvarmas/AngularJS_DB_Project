DROP TABLE IF EXISTS ball_by_ball Cascade;
DROP TABLE IF EXISTS player_match Cascade;
DROP TABLE IF EXISTS match Cascade;
DROP TABLE IF EXISTS team Cascade;
DROP TABLE IF EXISTS player Cascade;
DROP TABLE IF EXISTS venue Cascade;
DROP TABLE IF EXISTS umpire Cascade;
DROP TABLE IF EXISTS umpire_match Cascade;
DROP TABLE IF EXISTS owner Cascade;
DROP FUNCTION IF EXISTS trig_1 Cascade;
DROP FUNCTION IF EXISTS trig_2 Cascade;
DROP FUNCTION IF EXISTS trig_3 Cascade;
CREATE TABLE team (
    team_id         INTEGER         PRIMARY KEY,
    team_name       TEXT
);
CREATE FUNCTION trig_1(int1 int, int2 int) 
   RETURNS INT 
   LANGUAGE PLPGSQL
  AS
$$
declare
begin
    if (int1 + (select sum(owner.stake) from owner where owner.team_id=int2 group by int2)) > 100 or (int1 + (select sum(owner.stake) from owner where owner.team_id=int2 group by int2)) < 1 then
        return 0;
    else
        return 1;
    end if;
end;
$$;
CREATE TABLE owner (
    owner_id        INTEGER         PRIMARY KEY,
    owner_name      TEXT,
    owner_type      TEXT,
    team_id         INTEGER,
    FOREIGN KEY(team_id) REFERENCES team(team_id) on delete set null,
    stake           INTEGER,
    CONSTRAINT chk_stake CHECK (stake >=1 and stake <= 100),
    CONSTRAINT chk_sum_stake CHECK (trig_1(stake, team_id)=1)
);

CREATE TABLE umpire (
    umpire_id       INTEGER         PRIMARY KEY,
    umpire_name     TEXT,
    country_name    TEXT
);
CREATE TABLE venue (
    venue_id        INTEGER         PRIMARY KEY,
    venue_name      TEXT,
    city_name       TEXT,
    country_name    TEXT,
    capacity        INTEGER
);
CREATE TABLE player (
    player_id       INTEGER         PRIMARY KEY,
    player_name     TEXT,
    dob             DATE,
    batting_hand    TEXT,
    bowling_skill   TEXT,
    country_name    TEXT
);
CREATE FUNCTION trig_3(int1 int, int2 int) 
   RETURNS INT 
   LANGUAGE PLPGSQL
  AS
$$
declare
f int;
begin
    select venue.capacity into f from venue where venue.venue_id=int1;
    if int2<=f then
        return 1;
    else
        return 0;
    end if;
end;
$$;
CREATE TABLE match (
    match_id        INTEGER PRIMARY KEY,
    season_year     INTEGER,
    team1           INTEGER,
    FOREIGN KEY(team1) REFERENCES team(team_id) on delete set null,
    team2           INTEGER,
    FOREIGN KEY(team2) REFERENCES team(team_id) on delete set null,
    venue_id        INTEGER,
    FOREIGN KEY(venue_id) REFERENCES venue(venue_id) on delete set null,
    toss_winner     INTEGER,
    FOREIGN KEY(toss_winner) REFERENCES team(team_id) on delete set null,
    match_winner    INTEGER,
    FOREIGN KEY(match_winner) REFERENCES team(team_id) on delete set null,
    toss_name       TEXT,
    win_type TEXT CHECK(win_type='wickets' or win_type='runs' or win_type IS NULL),
    man_of_match    INTEGER,
    FOREIGN KEY(man_of_match) REFERENCES player(player_id) on delete set null,
    win_margin      INTEGER,
    attendance      INTEGER,
    CONSTRAINT chk_toss_name CHECK (toss_name IN ('field', 'bat')),
    CONSTRAINT chk_attendance CHECK (trig_3(venue_id, attendance)=1)
);
CREATE FUNCTION trig_2(int1 int, int2 text) 
   RETURNS INT 
   LANGUAGE PLPGSQL
  AS
$$
declare
f int;
t int;
begin
    select count(*) into f from umpire_match where umpire_match.match_id=int1 and umpire_match.role_desc='Field';
    select count(*) into t from umpire_match where umpire_match.match_id=int1 and umpire_match.role_desc='Third';
    if int2='Field' then
        if f+1<0 or f+1>2 or t<0 or t>1 then
            return 0;
        else
            return 1;
        end if;
    end if;
    if int2='Third' then
        if f<0 or f>2 or t+1<0 or t+1>1 then
            return 0;
        else
            return 1;
        end if;
    end if;
end;
$$;
CREATE TABLE umpire_match (
    umpirematch_key BIGINT          PRIMARY KEY,
    match_id        INTEGER,
    FOREIGN KEY(match_id) REFERENCES match(match_id) on delete set null,
    umpire_id       INTEGER,
    FOREIGN KEY(umpire_id) REFERENCES umpire(umpire_id) on delete set null,
    role_desc       TEXT,
    CONSTRAINT chk_role_desc_2 CHECK (role_desc IN ('Field', 'Third')),
    CONSTRAINT chk_umpire CHECK (trig_2(match_id, role_desc)=1)
);
CREATE TABLE player_match (
    playermatch_key BIGINT          PRIMARY KEY,
    match_id        INTEGER,
    FOREIGN KEY(match_id) REFERENCES match(match_id) on delete set null,
    player_id       INTEGER,
    FOREIGN KEY(player_id) REFERENCES player(player_id) on delete set null,
    role_desc       TEXT,
    team_id         INTEGER,
    FOREIGN KEY(team_id) REFERENCES team(team_id) on delete set null,
    CONSTRAINT chk_role_desc CHECK (role_desc IN ('Player', 'Keeper', 'CaptainKeeper', 'Captain'))
);
CREATE TABLE ball_by_ball (
    match_id        INTEGER,
    FOREIGN KEY(match_id) REFERENCES match(match_id) on delete set null,
    innings_no      INTEGER,
    over_id         INTEGER,
    ball_id         INTEGER,
    runs_scored     INTEGER,
    extra_runs      INTEGER,
    out_type TEXT CHECK(out_type='caught' or out_type='caught and bowled' or out_type='bowled' or out_type='stumped' or out_type='retired hurt' or out_type='keeper catch' or out_type='lbw'or out_type='run out' or out_type='hit wicket' or out_type IS NULL),
    striker         INTEGER,
    FOREIGN KEY(striker) REFERENCES player(player_id) on delete set null,
    non_striker     INTEGER,
    FOREIGN KEY(non_striker) REFERENCES player(player_id) on delete set null,
    bowler          INTEGER,
    PRIMARY KEY(match_id, innings_no, over_id,ball_id),
    FOREIGN KEY(bowler) REFERENCES player(player_id) on delete set null,
    CONSTRAINT chk_runs_scored CHECK (runs_scored IN (0, 1, 2, 3, 4, 5, 6)),
    CONSTRAINT chk_innings_no CHECK (innings_no IN (1, 2))
);