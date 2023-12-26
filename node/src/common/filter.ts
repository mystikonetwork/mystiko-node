import { storage } from '@mystikonetwork/protos';

export function ConvertToQueryFilter(
  filter: storage.v1.QueryFilter | storage.v1.Condition | storage.v1.SubFilter,
): storage.v1.QueryFilter {
  if (filter instanceof storage.v1.Condition) {
    return buildQueryFilterAnd([filter]);
  } else if (filter instanceof storage.v1.SubFilter) {
    return buildQueryFilterFromSubFilterAnd([filter]);
  }
  return filter;
}

export function buildConditionAnd(subFilters: storage.v1.SubFilter[]): storage.v1.Condition {
  return new storage.v1.Condition({
    subFilters: subFilters,
    operator: storage.v1.ConditionOperator.AND,
  });
}

export function buildConditionOr(subFilters: storage.v1.SubFilter[]): storage.v1.Condition {
  return new storage.v1.Condition({
    subFilters: subFilters,
    operator: storage.v1.ConditionOperator.OR,
  });
}

export function buildQueryFilterAnd(conditions: storage.v1.Condition[]): storage.v1.QueryFilter {
  return new storage.v1.QueryFilter({
    conditions: conditions,
    conditionsOperator: storage.v1.ConditionOperator.AND,
  });
}

export function buildQueryFilterOr(conditions: storage.v1.Condition[]): storage.v1.QueryFilter {
  return new storage.v1.QueryFilter({
    conditions: conditions,
    conditionsOperator: storage.v1.ConditionOperator.AND,
  });
}

export function buildQueryFilterFromSubFilterAnd(subFilters: storage.v1.SubFilter[]): storage.v1.QueryFilter {
  const condition = buildConditionAnd(subFilters);
  return buildQueryFilterAnd([condition]);
}

export function buildQueryFilterFromSubFilterOr(subFilters: storage.v1.SubFilter[]): storage.v1.QueryFilter {
  const condition = buildConditionOr(subFilters);
  return buildQueryFilterAnd([condition]);
}
