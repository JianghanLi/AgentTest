import xlrd

workbook = xlrd.open_workbook('AgentTest.xlsx')
print "var data = ["

booksheet = workbook.sheet_by_index(0)
for row in range(1, booksheet.nrows):
  print '["' + (str)(booksheet.cell(row, 0).value) + '"',
  for col in range(1, 10):
    print ',', booksheet.cell(row, col).value,
  print '],'
print ']'
